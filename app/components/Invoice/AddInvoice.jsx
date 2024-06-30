'use client'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import GenerateIncomeModal from './InvoiceModal'

const AddInvoice = () => {

    const [isModalOpen,setIsModalOpen] = useState(false)
  return (
    
        <div className='my-4 container mx-auto'>
        <Button
           style={{ backgroundColor: "#219653", color: "white" }}
           icon={<PlusOutlined />}
           onClick={()=>setIsModalOpen(true)}
        >
        Generate Invoice
      </Button>
      <GenerateIncomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
        </div>
  )
}

export default AddInvoice