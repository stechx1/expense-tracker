'use client';
import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import Link from 'next/link';

const Register = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className=' container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Expense Tracker</h1>
        <div className='rounded-2xl bg-white max-w-lg min-h-[400px] px-20 pt-12 pb-3'>
          <h2 className='font-bold text-lg'>Sign Up to create an account</h2>
          <Form
            size='large'
            name='basic'
            wrapperCol={{
              span: 20,
            }}
            style={{
              paddingTop: '20px',
              maxWidth: 800,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={() => ''}
            onFinishFailed={() => ''}
            autoComplete='off'
          >
            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='Email'
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
                offset: 8,
                span: 16,
              }}
            >
              <Button loading={loading} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Link
            className='text-xs text-primary font-bold'
            href={'/auth/sign-in'}
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
