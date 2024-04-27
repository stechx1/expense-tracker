export const mostSpentDayUtil = (data) => {
   
      console.log("tttooootttalll => ",data)
    const totals = {};
    data?.forEach(item => {
      totals[item.date] = (totals[item.date] || 0) + parseInt(item.expense);
    });
    return totals;

};