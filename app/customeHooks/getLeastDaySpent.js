import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { app, db } from '../firebase/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';

function getLeastDaySpent() {
  
    const [leastDaySpent, setLeastDaySpent] = useState()

    const auth = getAuth(app)
    const currentUser = auth.currentUser
    useEffect(()=>{

        const fetchData =async()=>{
          const pricesCollectionRef = collection(db,"users",currentUser.uid, 'expenses');
          const querySnapshot = await getDocs(query(pricesCollectionRef, orderBy('expense','asc'), limit(1)));
          const data = querySnapshot.docs.map((doc) => doc.data());
         
          setLeastDaySpent(format(data[0]?.date, 'EEEE'))
          
        }

       fetchData()

    },[])

    return {leastDaySpent}
}

export default getLeastDaySpent