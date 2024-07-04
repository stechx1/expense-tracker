'use client'
import getInvoice from '@/app/customeHooks/getInvoice'
import { app, db } from '@/app/firebase/firebase'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table } from 'antd'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import EditInvoiceModal from './EditInvoiceModal'
import Invoice from './InvoiceDetails'

const InvoiceDataTable = () => {

    const {invoices} = getInvoice()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [modalData,setModalData] = useState(null)
    const [open,setOpen] = useState(false)
    const [invoiceData,setInvoiceData] = useState(null)
    const auth =  getAuth(app)
    const currentUser = auth.currentUser

    const handleModalOpen = (data)=>{
           console.log("eidt data => ",data)
          setIsModalOpen(true)
          setModalData(data)
    }

    const handeInvoiceModal =(data)=>{
           setOpen(true)
           setInvoiceData(data)
    }
    
    const columns = [
        {
          title: <p className='text-nowrap'>Customer Name</p>,
          dataIndex: 'customerName',
          key: 'customerName',
          render: (text) => <p className='text-nowrap'>{text}</p>,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Contact No',
          dataIndex: 'contactNo',
          key: 'contactNo',
        },
        {
          title :'Item List',
          dataIndex:'items',
          key:'items',
          render : (list)=>(
             <div>
                 
                    <ul>
                        {list?.map((item,index)=>(
                          <li className='flex flex-col gap-y-1 p-2 border-2 border-slate-100 rounded-md my-1 ' key={index}>
                                <p><span className='font-medium'>Item: </span> <span>{item?.name}</span></p>
                                <p><span className='font-medium'>Amount: </span><span>{item?.amount}</span></p>
                                <p><span className='font-medium'>Description: </span><span>{item?.description}</span></p>
                          </li>
                        )) }
                    </ul>
                 
             </div>
          )
        },
        {
          title: 'Status',
          dataIndex: 'isPaid',
          key: 'isPaid',
          render: (text) => <p className='text-nowrap'>{text  ? 'Paid' :'Un Paid'}</p>,
        },
        {
          title: 'View',
          key: 'View',
          render: (_, record) => (
            
              <Button onClick={()=>handeInvoiceModal(record)}  style={{border:'1px solid rgb(37,99,235)',color:"rgb(37,99,235)"}}>View</Button>
           
          ),
        },
        {
          title: 'Edit',
          key: 'Edit',
          render: (_, record) => (
            
              <Button onClick={()=>handleModalOpen(record)}  color='green'  shape='circle' style={{border:'1px solid green',color:'green'}} icon={<EditOutlined />} />
           
          ),
        },
        
        {
          title: 'Delete',
          key: 'delete',
          render: (_, record) => (
            <Popconfirm
              title={`Delete the Invoice`}
              description={`Are you sure you want to delete the invoice`}
              onConfirm={()=>handleRemove(record?.id)}
              okText='Yes'
              cancelText='No'
            >
              <Button  danger shape='circle' icon={<DeleteOutlined />} />
            </Popconfirm>
          ),
        },
    ]

    const handleRemove = async(id) => {
     
      try {
        if (currentUser) {
          const incomeRef = doc(db, 'users', currentUser.uid, 'invoice', id);
          await deleteDoc(incomeRef);
         
        } else {
          console.error('User not authenticated.');
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
     
    };
  return (
    <div>
         <Table columns={columns} dataSource={invoices} />
         <EditInvoiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
         <Invoice open={open} setOpen={setOpen} invoiceData={invoiceData} />
    </div>
  )
}

export default InvoiceDataTable