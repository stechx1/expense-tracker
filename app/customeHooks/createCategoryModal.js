import { collection, query } from 'firebase/firestore';
import React, { useEffect } from 'react'

function createCategoryModal() {
    useEffect(()=>{

        const q = query(
            collection(db, "category"),limit(1));
      
          const unsubscribe = onSnapshot(q, (snapshot) => {
            let total = 0;
            let cat ={}
            snapshot.forEach((doc) => {
                   cat = doc.data()
                   })

                   console.log("catyy => ",cat)
          });

    },[])
}

export default createCategoryModal