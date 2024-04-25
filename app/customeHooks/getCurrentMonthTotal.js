import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { app, db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
function getCurrentMonthTotal() {

    const [currentMonthTotal, setCurrentMonthTotal] = useState(0)
   

    useEffect(() => {
      // Get the start and end dates for the current month
      const currentDate = new Date();
      const auth = getAuth(app)
    const currentUser = auth.currentUser
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
       
      // Convert dates to ISO 8601 format
      const currentMonthStart = firstDayOfMonth.toISOString();
      const currentMonthEnd = lastDayOfMonth.toISOString();
    
      const q = query(collection(db, 'users', currentUser.uid, 'expenses'), 
                      where('date', '>=', currentMonthStart), 
                      where('date', '<=', currentMonthEnd));
    
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let total = 0;
       
        snapshot.forEach((doc) => {
          const data = doc.data();
          
          total += data.expense;
        });
        setCurrentMonthTotal(total)
      });
    
      return () => unsubscribe();
    }, []);
    return{allExpenses:currentMonthTotal}
}

export default getCurrentMonthTotal