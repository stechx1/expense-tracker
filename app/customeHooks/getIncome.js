import { useEffect, useRef, useState } from 'react';
import { collection, doc, onSnapshot, query, updateDoc, addDoc, where } from 'firebase/firestore';
import { app, db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDays, addWeeks, addMonths, isSameDay, parseISO } from 'date-fns';

const getIncome = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isRendered, setIsRendered] = useState(false);
  const auth = getAuth(app);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;

    const incomeCollection = collection(db, 'users', currentUser.uid, 'income');
    const q = query(incomeCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let income = [];
      let total = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        income.push({ ...data, id });
        total += data.income;
      });

      setIsRendered(true);
      const unique = removeDuplicates(income)
      setAllIncome(unique);
      setTotalIncome(total);
    });

    return () => unsubscribe();
  }, [currentUser]);

  let unsub = true

  useEffect(() => {
    const checkAndAddRecurringIncome = async () => {
      
      if (allIncome.length > 0 && isRendered && !isLoadedRef.current) {
        for (const item of allIncome) {
          console.log('items => ', item);
          const givenDate = parseISO(item?.date); // Convert date string to Date object
          if (item?.recurring && !item?.isRecurr) {
            let nextDate;
            switch (item?.recurring) {
              case 'daily':
                nextDate = addDays(givenDate, 1);
                break;
              case 'weekly':
                nextDate = addWeeks(givenDate, 1);
                break;
              case 'monthly':
                nextDate = addMonths(givenDate, 1);
                break;
              default:
                nextDate = null;
            }

            if (nextDate) {
              const currentDate = new Date();
              const isRecurringDue = isSameDay(currentDate, nextDate);

              if (isRecurringDue && currentUser && item?.isRecurr == false) {
                const incomeRef = collection(db, 'users', currentUser.uid, 'income');

                // Add the recurring entry
                const itemDocRef = doc(db, 'users', currentUser.uid, 'income', item.id);
                await updateDoc(itemDocRef, {
                  isRecurr: true,
                });
                await addDoc(incomeRef, {
                  ...item,
                  date: currentDate.toISOString(),
                });

                // Update the item to mark as recurring
                
              }
            }
          }
        }
        
        // Mark as loaded after processing
        isLoadedRef.current = true;
      }
    };

    let load = true
    if(load && unsub){
       checkAndAddRecurringIncome()
       load = false
    }
    return ()=> {unsub = false}
  }, [isRendered, currentUser]);

  function removeDuplicates(arr) {
    // Use a Set to store unique keys
    let seen = new Set();
    // Custom function to generate a string key from the object
    function getKey(obj) {
      return `$${obj.description}-${obj.income}-${obj.isRecurr}-${obj.recurring}-${obj.source}-${!!obj.data}`;
    }
    
    return arr.filter(obj => {
      let key = getKey(obj);
      // Check if the key is already in the Set
      if (seen.has(key)) {
        return false; // Duplicate, filter it out
      } else {
        seen.add(key); // Add key to Set
        return true; // Not a duplicate, keep it
      }
    });
  }
  let filteredArray = removeDuplicates(allIncome);
  console.log("filtered array ",filteredArray)

  return { allIncome:filteredArray, totalIncome };
};

export default getIncome;
