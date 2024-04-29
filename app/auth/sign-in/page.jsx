'use client';
import { Button, Form, Input } from 'antd';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {useRouter} from "next/navigation"
import { useState } from 'react';
import Link from 'next/link';
import { app } from '@/app/firebase/firebase';
import { GoogleButton } from '@/app/components/GoogleButton';
import { toast} from 'react-toastify';

const SignIn = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Signed In With Google");
        router.push("/")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const email = values['email'];
    const password = values['password'];
    console.log(email, password);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User Signed In', userCredentials.user);
      
      router.push("/")
    } catch (err) {
      console.log(err);
      toast.error("Incorrect Credentials. ",{style:{color:'white',backgroundColor:'red'}})
    }
    finally{
         setLoading(false)
    }
  };

  return (
    <div className=' container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center max-w-[450px] w-full max-auto space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Not Broke</h1>
        <div className='rounded-2xl bg-white w-full min-h-[400px] mx-auto px-10 pt-12 pb-3'>
          <h2 className='font-bold text-lg'>Sign In</h2>
          <Form
            size='large'
            name='basic'
            wrapperCol={{
              span: 50,
            }}
            style={{
              paddingTop: '20px',
              maxWidth: 800,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={() => ''}
            autoComplete='off'
          >
            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input type='email' placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                
                span: 50,
              }}
              style={{width:'100%'}}
            >
              <Button loading={loading} type='primary' className='w-[100%]' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
         <div className='flex flex-col items-center'>
          <Link
            className='text-xs text-primary font-bold'
            href={'/auth/register'}
          >
            Dont have an account? Create Account
          </Link>

          <div className='mt-4'>
            <GoogleButton onClick={signInWithGoogle} />
          </div>
         </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;
