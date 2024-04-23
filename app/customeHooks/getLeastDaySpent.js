import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { app, db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

function getLeastDaySpent() {
  
    const [leastDaySpent, setLeastDaySpent] = useState()

    const auth = getAuth(app)
    const currentUser = auth.currentUser
    useEffect(()=>{

        const fetchData =async()=>{
            const querySnapshot = await getDocs(collection(db,"users",currentUser.uid ,'expenses'));
            const data = querySnapshot.docs.map(doc => doc.data());
 const dayTotalPrice = data.reduce((acc, item) => {
            const day = new Date(item.date).toISOString().slice(0, 10);
            if (acc[day]) {
              acc[day] += item.expense;
            } else {
              acc[day] = item.expense;
            }
            return acc;
          }, {});
        
          // Find the day with the lowest total price
          let dayWithLowestTotalPrice = null;
          let lowestTotalPrice = Infinity;
          for (const day in dayTotalPrice) {
            if (dayTotalPrice[day] < lowestTotalPrice) {
              lowestTotalPrice = dayTotalPrice[day];
              dayWithLowestTotalPrice = day;
            }
          }

          if(dayWithLowestTotalPrice){
            const dayOfWeek = format(dayWithLowestTotalPrice, 'EEEE')
       setLeastDaySpent(dayOfWeek)
          }
       

        }

       fetchData()

    },[])

    return {leastDaySpent}
}

export default getLeastDaySpent