import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { getYears } from '@/app/utils/util';
import { DoughnutChart } from '@/app/components/DoughnutChart';

export const DoughnutChartCategory = () => {
  return (
    <div className='flex flex-col'>
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

      <div>
        {/* Categories */}

        {/* Actual chart */}
        <div className='shadow-xl my-2'>
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};
