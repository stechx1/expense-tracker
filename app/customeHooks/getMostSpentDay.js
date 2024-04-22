import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";

function getMostSpentDay() {

  const [mostSpentDay, setMostSpentDay] = useState()  
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", currentUser.uid, "expenses")
      );
      const data = querySnapshot.docs.map((doc) => doc.data());
      const dayTotalPrice = data.reduce((acc, item) => {
        const day = new Date(item.date).toISOString().slice(0, 10);
        if (acc[day]) {
          acc[day] += item.expense;
        } else {
          acc[day] = item.expense;
        }
        return acc;
      }, {});

      // Find the day with the highest total price
      let dayWithHighestTotalPrice = null;
      let highestTotalPrice = 0;
      for (const day in dayTotalPrice) {
        if (dayTotalPrice[day] > highestTotalPrice) {
          highestTotalPrice = dayTotalPrice[day];
          dayWithHighestTotalPrice = day;
        }
      }
      if(dayWithHighestTotalPrice){
       const dayOfWeek = format(dayWithHighestTotalPrice, 'EEEE')
       setMostSpentDay(dayOfWeek)
      }
    };

    fetchData();
  }, []);

  return {mostSpentDay}
}

export default getMostSpentDay;
