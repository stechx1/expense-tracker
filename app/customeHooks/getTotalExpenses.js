import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function getTotalExpenses() {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0)

  useEffect(() => {
    if (!currentUser) return;

    const coll = collection(db, 'users', currentUser.uid, 'expenses');
    const q = query(coll);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        total += doc.data().expense;
      });
      setTotalSpent(total);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const coll = collection(db, 'users', currentUser.uid, 'income');
    const q = query(coll);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        total += doc.data().income;
      });
      setTotalIncome(total);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [currentUser]);

  return { totalSpent,totalIncome };
}

export default getTotalExpenses;