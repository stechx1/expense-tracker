import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getTotalPriceByCategory, getTotalPriceByCategoryIncome } from '../utils/getTotalPriceForCategory';

const getYearlyIncome = (selectedYear) => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const se = selectedYear.getFullYear();
  const firstDayOfYear = new Date(se, 0, 1);
  const lastDayOfYear = new Date(se, 11, 31);

  const currentYearStart = firstDayOfYear?.toISOString();
  const currentYearEnd = lastDayOfYear?.toISOString();

  const [allIncome, setAllIncome] = useState([]);
  const [monthCategory, setMonthCategory] = useState({});

  function fillPricesForYear(data) {
    const yearArray = new Array(12).fill(0); // Assuming 12 months in a year

    data.forEach((item) => {
      const monthOfYear = new Date(item?.date).getMonth();
      yearArray[monthOfYear] += item?.income;
    });

    return yearArray;
  }
  

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      // If currentUser is not available, do nothing
      return;
    }

    const q = query(
      collection(db, "users", currentUser.uid, "income"),
      where("date", ">=", currentYearStart),
      where("date", "<=", currentYearEnd)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let monthCat = [];
      let income = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        income.push(data);
        monthCat.push(data);
        total += data.income;
      });

      const pricesForYear = fillPricesForYear(income);
      setAllIncome(pricesForYear);
      const totalPriceByCat = getTotalPriceByCategoryIncome(monthCat);
      setMonthCategory(totalPriceByCat);
    });

    return () => unsubscribe();
  }, [currentUser, currentYearStart, currentYearEnd]);

  return { allIncome, monthCategory };
};

export default getYearlyIncome;
