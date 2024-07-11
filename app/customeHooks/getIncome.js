import { addDoc, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDays, differenceInDays, isSameDay, parseISO } from 'date-fns';

const getIncome = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalIncome,setTotalIncome] = useState(0)
  const auth = getAuth(app);
  const cUser= auth.currentUser
  const [isrendered,setIsrendered] = useState(false)
  
  

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;

    const incomeCollection = collection(db, "users", currentUser.uid, "income");
    const q = query(incomeCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let income = [];
      let total = 0
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        income.push({ ...data, id });
        total = total + data.income
      });
     
      setIsrendered(true)
      setAllIncome(income);
      setTotalIncome(total)
    });

    return () => unsubscribe();
  }, [currentUser]);

  console.log("all income => ",allIncome)
  let isLoaded = true
  useEffect(() => {
    if (!isLoaded) return
    const checkAndAddRecurringIncome = async () => {
      if (allIncome.length > 0) {
        for (const item of allIncome) {
          console.log("items => ", item);
          const givenDate = parseISO(item?.date); // Convert date string to Date object
          if (item?.recurring && !item?.isRecurr && isrendered) {
            let nextDate;
            switch (item?.recurring) {
              case "daily":
                nextDate = addDays(givenDate, 1);
                break;
              case "weekly":
                nextDate = addWeeks(givenDate, 1);
                break;
              case "monthly":
                nextDate = addMonths(givenDate, 1);
                break;
              default:
                nextDate = null;
            }

            if (nextDate) {
              const currentDate = new Date();
              const isRecurringDue = isSameDay(currentDate, nextDate);

              if (isRecurringDue && currentUser) {
                const incomeRef = collection(
                  db,
                  "users",
                  currentUser?.uid,
                  "income"
                );

                // Add the recurring entry
                await addDoc(incomeRef, {
                  ...item,
                  date: currentDate.toISOString(),
                });

                // Update the item date to the next date
                const itemDocRef = doc(
                  db,
                  "users",
                  currentUser?.uid,
                  "income",
                  item.id
                );
                await updateDoc(itemDocRef, {
                  
                  isRecurr:true
                });
                
              }
            }
          }
        }
      }
      
    };
    
   if(isLoaded){
    checkAndAddRecurringIncome()
     isLoaded = false 
  }
  
  
  }, [isrendered]);
  return { allIncome,totalIncome };
};

export default getIncome;
