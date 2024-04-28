import { Navbar } from "../components/Navbar";

export const metadata = {
    title: 'Register / Sign In',
    description: 'Register or sign in',
  };
  
  export default function AuthLayout({ children }) {
    return (<section className=" overflow-x-hidden px-1"  >
         
         <Navbar/>
        <div style={{overflowX:'hidden'}}>{children}</div>
        </section>
    )
  }
  