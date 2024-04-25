// Function to categorize icons based on categories
const categorizeIcons = (icons, categories) => {
    const resultArray = [];
  
    icons.forEach(iconObj => {
      const category = categories.find(catObj => catObj.category === Object.keys(iconObj)[0]);
      const categoryName = category ? category.category : "Other"; // If category is not found, default to "Other"
      const icon = Object.values(iconObj)[0];
  
      resultArray.push({ category: categoryName, icon: icon });
    });
  
    return resultArray;
  };
  
  export default categorizeIcons;
  