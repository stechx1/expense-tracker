export const getTotalPriceByCategory = (data) => {
   
        const totals = {};
        data.forEach(item => {
          totals[item.category] = (totals[item.category] || 0) + item.expense;
        });
        return totals;
    
  };

  export const getTotalPriceByCategoryIncome = (data) => {
   
    const totals = {};
    data.forEach(item => {
      totals[item.category] = (totals[item.category] || 0) + item.income;
    });
    return totals;

};