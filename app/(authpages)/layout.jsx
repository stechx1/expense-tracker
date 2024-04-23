import { Navbar } from "../components/Navbar";

export const metadata = {
    title: 'Register / Sign In',
    description: 'Register or sign in',
  };
  
  export default function AuthLayout({ children }) {
    return <section >
         
         <Navbar/>
        {children}</section>;
  }
  