import { Drawer } from 'antd'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import { app } from '../firebase/firebase';
import { usePathname } from 'next/navigation';

function NavDrawer({open, setOpen}) {
    const auth = getAuth(app);
    const pathname = usePathname()
  return (
    <Drawer
       
        placement={'left'}
        closable={false}
        
        onClose={()=>setOpen(false)}
        open={open}
        width={200}
        styles={{header:{fontWeight:800,fontSize:'20px' }}}
      >
         <h3 className='text-[20px] font-bold my-2 py-2 border-b-[1px] border-b-slate-700'>NotBroke</h3>
        <div className='flex flex-col gap-y-4 '>
          <Link href='/' className={`font-bold ${pathname == '/' ?'text-yellow-300':'text-black'}`}>Home</Link>

          <Link href='/monthly' className={` font-bold ${pathname == '/monthly' ?'text-yellow-300':'text-black'}`}>Monthly</Link>

          <Link href='/daily' className={`font-bold ${pathname == '/daily' ?'text-yellow-300':'text-black'}`}>Daily</Link>

          <Link href='/filter' className={`font-bold ${pathname == '/filter' ?'text-yellow-300':'text-black'}`}>Filter</Link>

          <Link href='/stats' className={`font-bold ${pathname == '/stats' ?'text-yellow-300':'text-black'}`}>Stats</Link>

          <Link href='/loan' className={`font-bold ${pathname == '/loan' ?'text-yellow-300':'text-black'}`}>Loan</Link>

          <Link href='/savings' className={`font-bold ${pathname == '/savings' ?'text-yellow-300':'text-black'}`}>Savings</Link>

          <Link href='/settings' className={`font-bold ${pathname == '/settings' ?'text-yellow-300':'text-black'}`}>Settings</Link>

          <button className='font-bold w-full text-start text-red-500 border-t-[2px] py-2' onClick={()=>signOut(auth)}>Sign Out</button>
        </div>
      </Drawer>
  )
}

export default NavDrawer