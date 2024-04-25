import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  startOfDay,
  endOfDay,
  format,
  isEqual,
  formatISO,
  isSameDay,
} from "date-fns";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getTotalPriceByCategory } from "../utils/getTotalPriceForCategory";

function getDayWiseTotal(date,isDateChanged) {
  const [currentDayTotal, setCurrentDayTotal] = useState(0);
  const [dayData,setDayData] = useState([])
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log("date ",date)
  const monthYear = new Date(date).getFullYear();
  const monthMonth =new Date(date).getMonth();
  const monthDay = new Date(date).getDate()
  const [categoryPrice,setCategoryPrice] = useState()
  const [chartData, setChartData] = useState([])
  const [chartKey, setChartKey] = useState([])
  const startOfDay = new Date(monthYear, monthMonth, monthDay);
  const endOfDay = new Date(monthYear, monthMonth, monthDay + 1);

 
  useEffect(() => {
    // Get the start and end dates for the current day
    const checkDate = date?.split("T")[0];
    const q = query(
      collection(db, "users", currentUser.uid, "expenses"),
      where("date", ">=", startOfDay.toISOString()),
      where("date", "<", endOfDay.toISOString())
     
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      console.log("day wise snap shot => ", snapshot);
      let category = []
      snapshot.forEach((doc) => {
        const data = doc.data();
          
          total += data.expense;
          category.push({ id: doc.id, ...data })

        
      });
      setCurrentDayTotal(total)
      setDayData(category)
      const cat = getTotalPriceByCategory(category)
      setCategoryPrice(cat)
     
      const catKey = Object.keys(cat).map(item=>item).sort()
      setChartKey(catKey)
      console.log("catkey => ",catKey)
      const val = catKey.map(item=>cat[item])
      setChartData(val)
    });
   
    
    return () => unsubscribe();
  }, [isDateChanged]);

 console.log("day data ==> ",dayData)

  return { currentDayTotal,dayData,categoryPrice,chartData,chartKey };
}

export default getDayWiseTotal;
