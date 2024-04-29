'use client'
import withAuth from '@/app/HOC/withAuth'
import UpdatePasswordModal from '@/app/components/UpdatePasswordModal'
import { categories, currencyArr, fontArr } from '@/app/data/categories'
import { app, db } from '@/app/firebase/firebase'
import { Button, Input, Select } from 'antd'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, limit, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

function Settings() {
    
    const auth = getAuth(app)
    const currentUser = auth.currentUser
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [language,setLanguage] = useState(null)

    console.log("current user ",currentUser)
    
    const updateLanguageToLocalStore =()=>{

             console.log("lan button")
    }

  return (
   

        <div className='container mx-auto '>
              <div className='flex flex-col md:flex-row  w-full items-start justify-start '>
                    
                   <div className='flex flex-col gap-y-3 justify-center items-center md:mt-5 w-full sticky top-1'>
                         <div className='w-[200px] h-[200px] text-center'>
                             <img src={currentUser?.photoURL ? currentUser?.photoURL : '/person.png'}  className='w-full h-[full] rounded-[50%]' />
                             
                         </div>
                         <div className='shadow-md border-[1px] border-slate-200 rounded p-2 px-5 '>

                                   <div className='py-3'>Hello <span>{currentUser?.displayName ? currentUser?.displayName :'No user name given'}</span></div>
                                   <div className='py-3 border-t-[1px] border-b-[1px]'>Registered Email: <span>{currentUser?.email}</span></div>
                                   <div className='py-3'>{currentUser?.emailVerified ?"User email is verified" :'User email is not verified'}</div>
                                   <Button type='primary' onClick={()=>setIsModalOpen(true)} >Update Password</Button>
                         </div>
                   </div>
                   <div className='hidden flex-col gap-y-3 w-full md:mt-5'>
 
                         <div className='flex flex-col gap-y-2'>
                               <h3 className='capitalize text-white bg-green-400 shadow-xl text-center py-4 font-bold rounded '>Change your setting here</h3>
                         </div>
                               
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Font</label>
                                 <Select placeholder='Categories'  options={fontArr} onChange={(e)=>setLanguage(e)} />
                                 <div className='my-1 flex justify-end'><Button type='primary' onClick={updateLanguageToLocalStore}>Select</Button></div>
                               </div>
                               {/* <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Select Currency</label>
                                 <Select placeholder='Categories' options={currencyArr} />
                               </div> */}

                               <div className='flex-col gap-y-3 hidden'>
                               <h3 className='capitalize text-white bg-green-400 shadow-xl text-center py-4 font-bold rounded '>Edit Category Name</h3>

                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Food</label>
                                 <Input placeholder='Food'  />
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Automobile</label>
                                 <Input placeholder='Automobile' />
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Entertainment</label>
                                 <Input placeholder='Entertainment' />
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Clothing</label>
                                 <Input placeholder='Clothing'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>HealthCare</label>
                                 <Input placeholder='HealthCare'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Shopping</label>
                                 <Input placeholder='Shopping'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Clothing</label>
                                 <Input placeholder='clothing'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Personal Care</label>
                                 <Input placeholder='Personal Care'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Investment</label>
                                 <Input placeholder='Investment'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Gifts & Donations</label>
                                 <Input placeholder='Gifts & Donations'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Bills & Utilities</label>
                                 <Input placeholder='Bills &  utility'/>
                               </div>
                               <div className='flex flex-col'>
                                 <label className='text-[18px] font-bold'>Others</label>
                                 <Input placeholder='Others'/>
                               </div>
                               
                               </div>
                             
                   </div>
                    <UpdatePasswordModal handleCancel={()=>setIsModalOpen(false)} isModalOpen={isModalOpen} />
              </div>
        </div>
  )
}

export default withAuth(Settings)