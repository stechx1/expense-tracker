import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
     
      console.log("total => ",total)
      setAllIncome(income);
      setTotalIncome(total)
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { allIncome,totalIncome };
};

export default getIncome;
