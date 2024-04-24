import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { getYears } from '@/app/utils/util';
import { DoughnutChart } from '@/app/components/DoughnutChart';

export const DoughnutChartCategory = () => {
  return (
    <div className='flex flex-col justify-center items-center shadow-xl my-2 p-4'>
      <Form.Item
        name='category'
        rules={[
          {
            required: true,
            message: 'Please input category!',
          },
        ]}
      >
        <Select placeholder='2024' options={getYears()} />
      </Form.Item>

      <div className=''>
        <DoughnutChart />
      </div>
    </div>
  );
};
