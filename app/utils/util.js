export const yearsGenereator = () => {
  var defaultYears = [];
  var dateVal = new Date();
  var currentYear = dateVal.getFullYear();
  var cutOffYears = 4; // using 5 years as cutoff as per reports cutoffyears to keep inline
  for (var i = currentYear - cutOffYears; i <= currentYear + cutOffYears; i++) {
    defaultYears.push(i);
  }

  return defaultYears;
};

export const getYears = () => {
  const years = yearsGenereator().map((year) => ({
    value: year,
    label: year,
  }));

  return years;
};
