
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase';
import { Alert, Flex, Spin } from 'antd';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const auth = getAuth(app);
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [authenticated, setAuthenticated] = useState(false); // Initialize authentication state

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(false); // Set loading to false once authentication state is determined

        if (user) {
          setAuthenticated(true); // Set authenticated to true if user is authenticated
        } else {
          router.push('/auth/sign-in'); // Redirect to login page if not authenticated
        }
      });

      return () => unsubscribe();
    }, [auth]);

    if (loading) {
      // Render a loading state while checking authentication state
      return (
        <div className='h-[80vh] w-full flex items-center justify-center' >
            <Flex className=''>

            <Spin  tip="Loading..." size='large'></Spin>
        </Flex>
        </div>
        
        
      )
    }

    if (!authenticated) {
      // Render nothing if not authenticated to prevent briefly displayed content
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;