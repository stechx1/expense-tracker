import AddInvoice from '@/app/components/Invoice/AddInvoice'
import InvoiceDataTable from '@/app/components/Invoice/InvoiceDataTable'
import InvoiceDetails from '@/app/components/Invoice/InvoiceDetails'
import React from 'react'

function Invoice() {
  return (
    <div className='container mx-auto'>
        <AddInvoice/>
        <InvoiceDataTable/>
         {/* <InvoiceDetails/> */}
    </div>
  )
}

export default Invoice
