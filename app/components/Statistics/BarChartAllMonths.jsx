import { Bar } from 'react-chartjs-2';
import { useLayoutEffect, useState } from 'react';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { getYears } from '@/app/utils/util';
import useResponsive from '@/app/customeHooks/useResponsive';

export const BarChartAllMonths = ({chartData ,setDate, setIsDateChanged}) => {

  const {width} = useResponsive()
  const handleChagne =(e)=>{

    setDate(new Date(e,0,1))
    setIsDateChanged(pre=>!pre)

}
  const data = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUNE',
      'JULY',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    datasets: [
      {
        label: "Expense",
        data:chartData,
        backgroundColor: 'rgb(81, 152, 114)',
        borderColor: 'rgb(81, 152, 114)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(66,133,234,0.6)',
        hoverBorderColor: 'rgba(66,133,234,1)',
      },
    ],
  };

  const options = {
    legend: {
      display: false,
      labels: {
        fontColor: 'rgb(247, 162, 120)',
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            fontColor: 'rgb(81, 152, 114)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            fontColor: 'rgb(81, 152, 114)',
          },
        },
      ],
    },
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'value',

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: true,

        // font size, default is defaultFontSize
        fontSize: 12,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: 'rgb(247, 162, 120)',

        // font style, default is defaultFontStyle
        fontStyle: 'bold',

        // font family, default is defaultFontFamily
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // draw text shadows under labels, default is false
        textShadow: true,

        // text shadow intensity, default is 6
        shadowBlur: 10,

        // text shadow X offset, default is 3
        shadowOffsetX: -5,

        // text shadow Y offset, default is 3
        shadowOffsetY: 5,

        // text shadow color, default is 'rgba(0,0,0,0.3)'
        shadowColor: 'rgba(255,0,0,0.75)',

        // draw label in arc, default is false
        // bar chart ignores this
        arc: true,

        // position to draw label, available value is 'default', 'border' and 'outside'
        // bar chart ignores this
        // default is 'default'
        position: 'inside',

        // draw label even it's overlap, default is true
        // bar chart ignores this
        overlap: false,

        // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
        showActualPercentages: true,

        // add padding when position is `outside`
        // default is 2
        outsidePadding: 4,

        // add margin of text when position is `outside` or `border`
        // default is 2
        textMargin: 14,
      },
    },
  };

  const optionsMobile = {
    legend: options.legend,
    plugins: options.plugins,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
            fontColor: 'rgb(81, 152, 114)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          scaleLabel: {
            display: false,
            labelString: 'Normalized/Indexed Data',
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <div className='flex flex-col justify-center items-center shadow-xl my-2 p-1 md:p-7 md:h-[500px] w-[100%]'>
      <Form.Item
        name='category'
        rules={[
          {
            required: true,
            message: 'Please input category!',
          },
        ]}
      >
        <Select placeholder='2024' options={getYears()} onChange={(e)=>handleChagne(e)}/>
      </Form.Item>

      <Bar
       
        data={data}
        height={'100%'}
        width={width <768 && '100%'}
        // height={window.screen.width > 720 ? 140 : 250}
        options={options}
       
        
      />
    </div>
  );
};
