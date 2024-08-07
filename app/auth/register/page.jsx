'use client';
import { Button, Form, Input } from 'antd';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { app } from '@/app/firebase/firebase';
import { GoogleButton } from '@/app/components/GoogleButton';
import { toast } from 'react-toastify';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Signed In With Google");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSubmit = async (values) => {
    setLoading(false);
    const email = values['email'];
    const password = values['password'];
    console.log(email, password);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User Created', userCredentials.user);
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Incorrect Credentials.", { style: { color: 'white', backgroundColor: 'red' } });
    }
  };

  const commonPasswords = [
    "password", "qwerty", "admin", "admin123@", "letmein", "welcome", "123456", "abcdef", "passw0rd", "12345678", "abcdefgh",
  ];

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your password!'));
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error('Password must be at least 8 characters long and include at least one uppercase letter and one special character.'));
    }

    for (let commonPassword of commonPasswords) {
      if (value.toLowerCase().includes(commonPassword)) {
        return Promise.reject(new Error('Password is too common.'));
      }
    }

    if (/(\d)\1{2,}/.test(value)) {
      return Promise.reject(new Error('Password contains consecutive identical digits.'));
    }

    if (/(.)\1{2,}/.test(value)) {
      return Promise.reject(new Error('Password contains consecutive identical characters.'));
    }

    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    }
  });

  return (
    <div className='container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center max-w-[450px] w-full items-center space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Not Broke</h1>
        <div className='rounded-2xl bg-white w-full min-h-[400px] mx-auto px-10 pt-12 pb-3'>
          <h2 className='font-bold text-lg'>Sign Up</h2>
          <Form
            size='large'
            name='basic'
            wrapperCol={{ span: 50 }}
            style={{ paddingTop: '20px', maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={() => ''}
            autoComplete='off'
          >
            <Form.Item
              style={{ maxWidth: '100%' }}
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type='email' placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[{ required: true, min: 8, validator: validatePassword }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              dependencies={['password']}
              rules={[{ required: true, message: 'Please confirm your password!' }, validateConfirmPassword]}
            >
              <Input.Password placeholder='Confirm Password' />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 50 }}>
              <Button className='w-full' loading={loading} type='primary' htmlType='submit'>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className='flex flex-col items-center justify-center'>
            <Link className='text-xs text-primary font-bold' href={'/auth/sign-in'}>
              Already have an account? Log in
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

export default Register;
