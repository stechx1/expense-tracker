/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { LoanDataTable } from '../../components/LoanDataTable';
import { Button, Pagination } from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';

import withAuth from '@/app/HOC/withAuth';
import { StatCard } from '@/app/components/StatCard';
import { useRef, useState } from 'react';
import { AddLoanModal } from '@/app/components/AddLoanModal';
import getLoandata from '@/app/customeHooks/getLoandata';
import { printDiv } from '@/app/utils/printData';
import ExportAsExcel from '@/app/components/ExportAsExcel';
import useResponsive from '@/app/customeHooks/useResponsive';
const Loan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loanData,givenLoan,takenLoan} = getLoandata()
  const tableRef = useRef()
  const {width} = useResponsive()

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend
  );



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className='container mx-auto overflow-x-hidden ' id='divToPrint'>
      <div className='grid grid-cols-2 md:grid-cols-4 my-10 gap-6'>
        <StatCard name={'You need to repay'} stat={`${takenLoan}`} />
        <StatCard name={'You need to get'} stat={`${givenLoan}`} />
      </div>

      <div className='mb-8'>
        <Button onClick={showModal} icon={<PlusOutlined />} type='primary'>
          {width > 768 && <span>Add Loan</span>}
        </Button>

        <AddLoanModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <div className="flex items-center justify-end gap-x-2 my-1">
          <Button
            icon={<PrinterOutlined />}
            style={{ backgroundColor: "#FF5733", color: "white" }}
            onClick={()=>printDiv("divToPrint")}
          >
            {width > 768 && <span>Print</span>}
          </Button>
           <ExportAsExcel tableRef={tableRef} />
        </div>
      <div className='my-4' ref={tableRef}>
        <LoanDataTable
           loanData={loanData}
        />
      </div>
    </main>
  );
};

export default withAuth(Loan);
