import { collection, count, getAggregateFromServer, onSnapshot, query, sum, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getTotalPriceByCategory } from "../utils/getTotalPriceForCategory";

function getMonthlyTotal(selectedMonth,isDateChanged) {

     
    const auth = getAuth(app)
    const currentUser = auth.currentUser
    const monthYear = new Date(selectedMonth).getFullYear();
      const monthMonth =new Date(selectedMonth).getMonth();
      const firstDayOfMonth = new Date(monthYear, monthMonth, 1);
      const lastDayOfMonth = new Date(monthYear, monthMonth + 1, 0);
   
      const currentMonthStart = firstDayOfMonth?.toISOString();
      const currentMonthEnd = lastDayOfMonth?.toISOString();
    const [totalSpent,setTotalSpent] = useState(0)
    const [monthCategory,setMonthCategory] = useState({})
    const [allExpenses, setAllExpenses] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartKey,setChartKey] = useState([])

    function fillPricesForMonth(data) {
        const monthArray = new Array(30).fill(0); // Assuming 30 days in April
      
        data.forEach(item => {
          const dayOfMonth = new Date(item?.date).getDate();
          monthArray[dayOfMonth - 1] = item?.expense; // Adjust index since day starts from 1
        });
      
        return monthArray;
      }
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
          exp.push(data)
          monthCat.push(data)
          exp.push(data?.expense)
          total += data.expense;
        });
  
        setTotalSpent(total)
        
        const pricesForApril = fillPricesForMonth(exp);
        setAllExpenses(pricesForApril)
        const totalPriceByCat = getTotalPriceByCategory(monthCat)
        setMonthCategory(totalPriceByCat)
        const catKey = Object.keys(totalPriceByCat).map(item=>item).sort()
         setChartKey(catKey)
     
      const val = catKey.map(item=>totalPriceByCat[item])
      setChartData(val)
        
      });
      
      return ()=>unsubscribe()
    
  }, [isDateChanged]);

  console.log("monthly total => ",totalSpent)

  return {totalSpent,monthCategory,allExpenses,chartData,chartKey}
}

export default getMonthlyTotal;
