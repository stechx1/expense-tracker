'use client';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { app } from '../firebase/firebase';
import { usePathname } from 'next/navigation';

export const Navbar = () => {

  const auth = getAuth(app);
  const pathname = usePathname()

  return (
    <nav className='bg-primary py-4 px-2 text-white'>
      <div className='flex justify-between'>
        <div>
          <h2 className='font-bold text-2xl'>Expense Manager</h2>
        </div>
        <div className='flex gap-x-4 items-center'>
          <Link href='/' className={`font-bold ${pathname == '/' ?'text-yellow-300':'text-white'}`}>Home</Link>

          <Link href='/monthly' className={` font-bold ${pathname == '/monthly' ?'text-yellow-300':'text-white'}`}>Monthly</Link>

          <Link href='/daily' className={`font-bold ${pathname == '/daily' ?'text-yellow-300':'text-white'}`}>Daily</Link>

          <Link href='/filter' className={`font-bold ${pathname == '/filter' ?'text-yellow-300':'text-white'}`}>Filter</Link>

          <Link href='/stats' className={`font-bold ${pathname == '/status' ?'text-yellow-300':'text-white'}`}>Stats</Link>

          <Link href='/loan' className={`font-bold ${pathname == '/loan' ?'text-yellow-300':'text-white'}`}>Loan</Link>

          <Link href='/savings' className={`font-bold ${pathname == '/savings' ?'text-yellow-300':'text-white'}`}>Savings</Link>

          <Link href='/settings' className={`font-bold ${pathname == '/settings' ?'text-yellow-300':'text-white'}`}>Settings</Link>

          <button className='font-bold' onClick={()=>signOut(auth)}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
};
