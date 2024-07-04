import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDays } from 'date-fns';

const getIncome = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalIncome,setTotalIncome] = useState(0)
  const auth = getAuth(app);

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
     
     
      setAllIncome(income);
      setTotalIncome(total)
    });

    return () => unsubscribe();
  }, [currentUser]);

  console.log("all income => ",allIncome)

  useEffect(()=>{

    
           if(allIncome.length > 0){
            
                    allIncome.map(async(item)=>{
                      const givenDate = new Date(item?.date);
                      if(item?.recurring){
                         const intervalDays = item?.recurring == 'daily' ? 1 : item?.recurring == 'weekly' ? 7 : item?.recurring == 'monthly' ?30 :null
                        const targetDate = addDays(givenDate, intervalDays);
                        const currentDate = new Date();
                        const isok = isAfter(currentDate, targetDate);
                        if(isok){


                          if (currentUser) {
                            const incomeRef = collection(
                              db,
                              "users",
                              currentUser?.uid,
                              "income"
                            );
                            const docRef = await addDoc(incomeRef, {...item});
                            
                          }
                        }
                      }       
                    })
           }
  },[])

  return { allIncome,totalIncome };
};

export default getIncome;
