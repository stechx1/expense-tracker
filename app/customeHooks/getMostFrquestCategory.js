import { onSnapshot, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';

function getMostFrquestCategory() {
   
      const [highestCategory, setHighestCategory] = useState();
      const auth = getAuth(app)
      const currentUser = auth.currentUser
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db,"users",currentUser.uid ,'expenses'));
            const data = querySnapshot.docs.map(doc => doc.data());
            const categoryTotalPrice = data.reduce((acc, item) => {
                if (acc[item.category]) {
                  acc[item.category] += item.expense;
                } else {
                  acc[item.category] = item.expense;
                }
                return acc;
              }, {});
            
              // Find the category with the highest total price
              let categoryWithHighestTotalPrice = null;
              let highestTotalPrice = 0;
              for (const category in categoryTotalPrice) {
                if (categoryTotalPrice[category] > highestTotalPrice) {
                  highestTotalPrice = categoryTotalPrice[category];
                  categoryWithHighestTotalPrice = category;
                }
              }

              setHighestCategory(categoryWithHighestTotalPrice)
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
   
return {categorizedData:highestCategory}
}

export default getMostFrquestCategory