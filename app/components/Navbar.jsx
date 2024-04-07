'use client';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='bg-primary py-4 px-2 text-white'>
      <div className='flex justify-between'>
        <div>
          <h2 className='font-bold text-2xl'>Expense Manager</h2>
        </div>
        <div className='flex space-x-3'>
          <Link href='/'>Home</Link>

          <Link href='/monthly'>Monthly</Link>

          <Link href='/monthly'>Daily</Link>

          <Link href='/filter'>Filter</Link>

          <Link href='/stats'>Stats</Link>

          <Link href='/loan'>Loan</Link>

          <Link href='/savings'>Savings</Link>

          <Link href='/settings'>Settings</Link>

          <Link href='/'>Sign Out</Link>
        </div>
      </div>
    </nav>
  );
};
