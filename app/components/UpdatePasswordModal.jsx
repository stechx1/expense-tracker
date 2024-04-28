import { Button, Form, Modal,Input } from 'antd'
import { getAuth, updatePassword } from 'firebase/auth';

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { app } from '../firebase/firebase';

function UpdatePasswordModal({isModalOpen,handleCancel}) {
    const [loading, setLoading] = useState();


    const handleSubmit = (values) => {

        console.log("values => ",values)
        
        setLoading(true)
         const password = values['newPassowrd']
         const repeatPassword = values['repeatPassowrd']
          if(password != repeatPassword){
               
                toast.error("new and repeat password should match!",{style:{backgroundColor:'red',color:'white'}})
                return 
          }
        const auth = getAuth(app);
        const user = auth.currentUser;
    
        updatePassword(user, password)
          .then(() => {
            // Password updated successfully
            console.log("Password updated successfully");
            toast.success("password updated successfully",{style:{backgroundColor:'green',color:'white'}})
            setLoading(false)
          })
          .catch((error) => {
            // An error occurred
            console.log("update password error => ",error)
            toast.error("something went wrong, please try again!",{style:{backgroundColor:'red',color:'white'}})
            setLoading(false)
          }).finally(()=>{
              setLoading(false)
          })
      };
    
  return (
    <Modal
      title='Update Password'
      open={isModalOpen}
      footer={null}
      // okText='Submit'
      // onOk={handleOk}
      onCancel={handleCancel}
      styles={{content:{backgroundColor:'rgb(245,245,240)'},header:{backgroundColor:'transparent'}}}
    >
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
          name='newPassowrd'
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
        >
          <Input placeholder='new Password' />
        </Form.Item>

        <Form.Item
          name='repeatPassowrd'
          rules={[
            {
              required: true,
              message: 'Please input repeat new password!',
            },
          ]}
        >
          <Input placeholder='Repeat New Password' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            
            span: 50,
          }}
        >
          <div className='flex justify-end' >
            <div className='flex gap-x-1'>
              <Button style={{backgroundColor:"red",color:'white'}} onClick={handleCancel} className='bg-red-600'>Cancel</Button>
              <Button loading={loading} type='primary' htmlType='submit'>
              Submit
            </Button>
            </div>
             
          </div>
         
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdatePasswordModal