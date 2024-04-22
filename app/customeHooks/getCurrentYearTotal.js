import { useEffect, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

function getCurrentYearTotal() {
  const [totalPrice, setTotalPrice] = useState(null);
  const auth = getAuth(app)
    const currentUser = auth.currentUser

    useEffect(() => {
        const currentYearStart = `${new Date().getFullYear()}-01-01T00:00:00.000Z`;
        const currentYearEnd = `${new Date().getFullYear()}-12-31T23:59:59.999Z`;
      
        const q = query(collection(db, 'users', currentUser.uid, 'expenses'), 
                        where('date', '>=', currentYearStart), 
                        where('date', '<=', currentYearEnd));
      
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let total = 0;
          snapshot.forEach((doc) => {
            const data = doc.data();
            total += data.expense;
          });
          setTotalPrice(total);
        });
      
        return () => unsubscribe();
      }, []);

  return {currentYearTotal:totalPrice}
}

export default getCurrentYearTotal