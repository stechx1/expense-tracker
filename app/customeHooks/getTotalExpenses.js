import { collection, count, getAggregateFromServer, sum, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function getTotalExpenses() {
    const auth = getAuth(app)
    const currentUser = auth.currentUser
    const [totalSpent,setTotalSpent] = useState(0)
  useEffect(() => {
    const getTotal = async () => {
      const coll = collection(db, 'users', currentUser.uid, 'expenses');
      const snapshot = await getAggregateFromServer(coll, {
        expense: sum("expense")
        
      });

      setTotalSpent(snapshot.data().expense)
    
    };

    getTotal()
  }, []);

  return {totalSpent}
}

export default getTotalExpenses;
