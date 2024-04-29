'use client';
import { useEffect, useState } from 'react';
import { SavingCard } from '@/app/components/SavingCard';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import withAuth from '../../HOC/withAuth';
import { AddSavingsModal } from '@/app/components/AddSavingsModal';
import { getAuth } from 'firebase/auth';
import { app, db } from '@/app/firebase/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import useResponsive from '@/app/customeHooks/useResponsive';

function Savings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savings,setSavings] = useState([])
  const perPage=16
  const [currentPage,setCurrentpage] = useState(1)
  const {width} = useResponsive()
  const auth = getAuth(app)
  const currentUser = auth.currentUser

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  

  useEffect(()=>{

    const fetchSavings = async () => {
      if (currentUser) {
        const expensesRef = collection(
          db,
          "users",
          currentUser.uid,
          "savings"
        );

        let q = query(expensesRef, orderBy("date", "desc"));

        // if (lastVisible) {
        //   q = query(expensesRef, orderBy('date'), start(lastVisible), limit(limitPerPage));
        // }

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const savingData = [];
          snapshot.forEach((doc) => {
            savingData.push({ id: doc.id, ...doc.data() });
          });
           setSavings(savingData)
        });

        return () => unsubscribe(); // Clean up the snapshot listener
      } else {
        console.error("User not authenticated.");
      }
    }

    fetchSavings()   

  },[])

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = savings?.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log("current Item  => ",currentItems)
  return (
    <main className='container mx-auto '>
      <div className='my-6'>
        <Button onClick={showModal} icon={<PlusOutlined />} type='primary'>
        {width > 768 && <span>Add Savings</span> }
        </Button>

        <AddSavingsModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <div className='grid grid-cols-4 gap-6 my-6'>
         {currentItems?.map((item,index)=>(
              <SavingCard savingItem={item} key={index} />
         ))}
      </div>
      {savings?.length > 16 && <Pagination defaultCurrent={1} total={savings.length} pageSize={perPage} onChange={(e)=>setCurrentpage(e)}   />}
    </main>
  );
}

export default withAuth(Savings);
