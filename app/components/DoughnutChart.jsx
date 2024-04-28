import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Your plugin

import { Doughnut, Line } from 'react-chartjs-2';

export const DoughnutChart = ({chartData,chartKey}) => {
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels: chartKey,
    datasets: [
      {
        data: chartData, // Replace these with your actual expense values
        backgroundColor : ['#FF6384', '#36A2EB', '#FFCE56', '#4BC5F8', '#8A2BE2', '#00CED1', '#32CD32', '#FFA07A', '#9370DB', '#00FF7F', '#FF1493'],
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC5F8'],
        borderWidth: 0,
      },
    ],
  };

  const options = {

    legend: {
      position: 'center',
      display: true,
      fullWidth: true,
      reverse: false,
      labels: { fontColor: 'rgb(247, 162, 120)' },
    },
    layout: { padding: { left: 15, right: 85, top: 5, bottom: 5 } },
    cutoutPercentage: 70,
    plugins: {
      labels: {
        render: 'percentage',
        precision: 0,
        showZero: true,
        fontSize: 12,
        fontColor: '#000',
        fontStyle: 'bold',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        textShadow: true,
        shadowBlur: 10,
        shadowOffsetX: -5,
        shadowOffsetY: 5,
        shadowColor: 'rgba(255,0,0,0.75)',
        arc: true,
        position: 'inside',
        overlap: false,
        showActualPercentages: true,
        outsidePadding: 4,
        textMargin: 14,
      },
    },
  };

  return (
    <div >
      <Doughnut
        data={data}
        options={ options }
        height={window.screen.width > 720 ? 80 : 230}
        responsive={true}
      />
    </div>
  );
};
