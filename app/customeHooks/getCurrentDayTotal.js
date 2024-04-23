import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, Timestamp } from "firebase/firestore";
import { startOfDay, endOfDay, format, isEqual, formatISO, isSameDay } from "date-fns";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function getCurrentDayTotal() {
  const [currentDayTotal, setCurrentDayTotal] = useState(0);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Get the start and end dates for the current day
    const currentDate = new Date();
    


  

    const q = query(
      collection(db, "users", currentUser.uid, "expenses"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
     
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("data => ",data)
        if (isSameDay(data?.date,currentDate.toISOString())) {
          total += data.expense;
        }
      });
      console.log("total:", total);
      setCurrentDayTotal(total);
    });

    return () => unsubscribe();
  }, []);

  console.log("current day total => ", currentDayTotal);

  return { currentDayTotal };
}

export default getCurrentDayTotal;
