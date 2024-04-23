import { Doughnut, Line } from 'react-chartjs-2';

export const DoughnutChart = () => {
  const data = {
    labels: ['Food', 'Entertainment', 'Bills', 'Transportation'],
    datasets: [
      {
        data: [400, 200, 300, 100], // Replace these with your actual expense values
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC5F8'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC5F8'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      // position: 'left',
      fullWidth: true,
      reverse: false,
      labels: { fontColor: 'rgb(247, 162, 120)' },
    },
    layout: { padding: { left: 15, right: 85, top: 5, bottom: 5 } },
    cutoutPercentage: 70,
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'percentage',

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: true,

        // font size, default is defaultFontSize
        fontSize: 12,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: '#000',

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

  return (
    <div>
      <Doughnut
        data={data}
        options={window.screen.width > 720 ? options : optionsMobile}
        height={window.screen.width > 720 ? 80 : 230}
        responsive={true}
      />
    </div>
  );
};
