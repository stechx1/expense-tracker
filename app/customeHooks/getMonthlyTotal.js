import { collection, count, getAggregateFromServer, onSnapshot, query, sum, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function getMonthlyTotal(selectedMonth,isDateChanged) {

     
    const auth = getAuth(app)
    const currentUser = auth.currentUser
    const monthYear = new Date(selectedMonth).getFullYear();
      const monthMonth =new Date(selectedMonth).getMonth();
      const firstDayOfMonth = new Date(monthYear, monthMonth, 1);
      const lastDayOfMonth = new Date(monthYear, monthMonth + 1, 0);
      const currentMonthStart = firstDayOfMonth.toISOString();
      const currentMonthEnd = lastDayOfMonth.toISOString();
    const [totalSpent,setTotalSpent] = useState(0)
    const [monthCategory,setMonthCategory] = useState([])
    const [allExpenses, setAllExpenses] = useState([])
  useEffect(() => {

    const q = query(
        collection(db, "users", currentUser?.uid, "expenses"),
        where("date", ">=", currentMonthStart),
        where("date", "<=", currentMonthEnd)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let total = 0;
        let monthCat =[]
        let exp =[]
        snapshot.forEach((doc) => {
          const data = doc.data();
          monthCat.push(data)
          exp.push(data?.expense)
          total += data.expense;
        });
  
        setTotalSpent(total)
        setMonthCategory(monthCat)
        setAllExpenses(exp)
      
      });
  
      return ()=>unsubscribe()
    
  }, [isDateChanged]);

  console.log("monthly total => ",totalSpent)

  return {totalSpent,monthCategory,allExpenses}
}

export default getMonthlyTotal;
