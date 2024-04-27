import { onSnapshot, collection, getDocs, orderBy, query, where, limit } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { categories } from '../data/categories';
import { getTotalPriceByCategory } from '../utils/getTotalPriceForCategory';

function getMostFrquestCategory() {
   
      const [highestCategory, setHighestCategory] = useState();
      const auth = getAuth(app)
      const currentUser = auth.currentUser
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const pricesCollectionRef = collection(db,"users",currentUser.uid, 'expenses');
           const expenseByCat = categories.map(async(item)=>{
              const querySnapshot = await getDocs(query(pricesCollectionRef, orderBy("category"), where("category","==" ,item.value)));
              return querySnapshot
            })

            
             let getData = []
             const expenseCatSnapShot = await Promise.all(expenseByCat)
             const res = expenseCatSnapShot.map(item=>{
                    item.forEach(it=>{
                          getData.push(it.data())
                    })
             })

             
             const totalPriceByCat = getTotalPriceByCategory(getData)
             
             const a = Object.keys(totalPriceByCat).map(item=>{
                      return ({category:item,expense:totalPriceByCat[item]})
             })

             const sortData = a.sort((one,two)=>two.expense - one.expense)
             console.log("sort data => ",sortData)
             setHighestCategory(sortData[0]?.category)
             
           
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
   
return {categorizedData:highestCategory}
}

export default getMostFrquestCategory