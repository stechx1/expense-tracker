import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { getYears } from '@/app/utils/util';


export const BarChartAllMonths = () => {
  return (
    <div>
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
    </div>
  );
};
