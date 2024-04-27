import { collection, getDocs, limit, orderBy, query,sum } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import { mostSpentDayUtil } from "../utils/mostSpentDay";

function getMostSpentDay() {

  const [mostSpentDay, setMostSpentDay] = useState()  
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => { 

      const pricesCollectionRef = collection(db,"users",currentUser.uid, 'expenses');
      const querySnapshot = await getDocs(query(pricesCollectionRef, orderBy('expense','desc')));
      const data = querySnapshot.docs.map((doc) => doc.data());
      
        const daySpentMost = mostSpentDayUtil(data)
        const getDayWithExapense = Object.keys(daySpentMost).map(item=>{
               return ({date:item,expense:daySpentMost[item]})
        })

        const sortedArr = getDayWithExapense.sort((a,b)=>b.expense - a.expense)
        console.log("sorted arr => ",sortedArr)
        sortedArr.length > 0 && setMostSpentDay(format(sortedArr[0]?.date, 'EEEE'))
      
    };

    fetchData();
  }, []);

  return {mostSpentDay}
}

export default getMostSpentDay;
