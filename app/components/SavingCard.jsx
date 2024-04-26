import { Button, Form, InputNumber, Progress } from 'antd';

export const SavingCard = () => {
  return (
    <div className='bg-white rounded-md shadow-lg drop-shadow-md shadow-gray-100'>
      <div className='bg-primary p-4 rounded-t-md'>
        <h2 className='text-lg text-white font-bold'>
          {' '}
          <span className='text-2xl'>20th April,</span> 2024
        </h2>
      </div>

      <div className='p-4'>
        <div className='flex gap-6'>
          <Form.Item
            style={{
              maxWidth: '100%',
            }}
            name='date'
            rules={[
              {
                required: true,
                message: 'Please input your date!',
              },
            ]}
          >
            <InputNumber placeholder='Saving' />
          </Form.Item>

          <div>
            <Button>Add Saving</Button>
          </div>
        </div>

        <div className='my-4'>
          <h2 className='text-xl font-bold'> <span className='text-primary text-5xl'>3000</span> more to go</h2>
        </div>

        <div>
          <Progress strokeColor={"#219653"} percent={26}/>
        </div>
      </div>
    </div>
  );
};
