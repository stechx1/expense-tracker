import { Calendar, theme } from 'antd';


export const MonthCalendar = ({setMonthWiseData,setIsDateChanged}) => {
  const { token } = theme.useToken();
  const onPanelChange = (e) => {
    setMonthWiseData(e.toISOString())
    setIsDateChanged(pre=>!pre)
    
  };
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={wrapperStyle} className='shadow-lg'>
      <Calendar fullscreen={false} onChange={(e)=>onPanelChange(e)} />
    </div>
  );
};
