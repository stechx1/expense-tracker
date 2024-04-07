export const metadata = {
  title: 'Register / Sign In',
  description: 'Register or sign in',
};

export default function AuthLayout({ children }) {
  return <section className='bg-primary'>{children}</section>;
}
