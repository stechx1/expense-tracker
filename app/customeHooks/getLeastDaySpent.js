import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { app, db } from '../firebase/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';
import { mostSpentDayUtil } from '../utils/mostSpentDay';

function getLeastDaySpent() {
  
    const [leastDaySpent, setLeastDaySpent] = useState()

    const auth = getAuth(app)
    const currentUser = auth.currentUser
    useEffect(()=>{

        const fetchData =async()=>{
          const pricesCollectionRef = collection(db,"users",currentUser.uid, 'expenses');
          const querySnapshot = await getDocs(query(pricesCollectionRef, orderBy('expense','asc')));
          const data = querySnapshot.docs.map((doc) => doc.data());
         
          const daySpentLess = mostSpentDayUtil(data)
          const getDayWithExapense = Object.keys(daySpentLess).map(item=>{
                 return ({date:item,expense:daySpentLess[item]})
          })
  
          const sortedArr = getDayWithExapense.sort((a,b)=>a.expense - b.expense)
          console.log("sorted arr => ",sortedArr)
          sortedArr.length > 0 && setLeastDaySpent(format(sortedArr[0]?.date, 'EEEE'))
        }

       fetchData()

    },[])

    return {leastDaySpent}
}

export default getLeastDaySpent