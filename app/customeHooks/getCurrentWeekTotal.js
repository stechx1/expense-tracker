import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { app, db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

const getCurrentWeekTotal =()=>{

    const [currentWeekTotal,setCurrentWeekTotal] = useState(0)

useEffect(() => {
  // Get the start and end dates for the current week
  const currentDate = new Date();
  const currentWeekStart = startOfWeek(currentDate); // Monday of the current week
  const currentWeekEnd = endOfWeek(currentDate); // Sunday of the current week
  const auth = getAuth(app)
    const currentUser = auth.currentUser

  // Format dates to ISO 8601 format
  const currentWeekStartISO = currentWeekStart.toISOString();
  const currentWeekEndISO = currentWeekEnd.toISOString()

  const q = query(collection(db, 'users', currentUser.uid, 'expenses'), 
                  where('date', '>=', currentWeekStartISO), 
                  where('date', '<=', currentWeekEndISO));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    let total = 0;
    console.log("current week saving => ",snapshot)
    snapshot.forEach((doc) => {
      const data = doc.data();
      total += data.expense;
    });
    setCurrentWeekTotal(total);
  });

  return () => unsubscribe();
}, []);

  return {currentWeekTotal}
}

export default getCurrentWeekTotal
