import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getTotalPriceByCategory } from "../utils/getTotalPriceForCategory";

function getYearlyTotal(selectedYear, isDateChanged) {
    console.log("selected year ==> ",selectedYear)
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const se = selectedYear.getFullYear()
  const firstDayOfYear = new Date(se, 0, 1);
  const lastDayOfYear = new Date(se, 11, 31);

  const currentYearStart = firstDayOfYear?.toISOString();
  const currentYearEnd = lastDayOfYear?.toISOString();
  const [totalSpent, setTotalSpent] = useState(0);
  const [monthCategory, setMonthCategory] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);

  function fillPricesForYear(data) {
    const yearArray = new Array(12).fill(0); // Assuming 12 months in a year

    data.forEach((item) => {
      const monthOfYear = new Date(item?.date).getMonth();
      yearArray[monthOfYear] += item?.expense;
    });

    return yearArray;
  }

  useEffect(() => {
    const q = query(
      collection(db, "users", currentUser?.uid, "expenses"),
      where("date", ">=", currentYearStart),
      where("date", "<=", currentYearEnd)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let monthCat = [];
      let exp = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        exp.push(data);
        monthCat.push(data);
        exp.push(data?.expense);
        total += data.expense;
      });

      setTotalSpent(total);

      const pricesForYear = fillPricesForYear(exp);
      setAllExpenses(pricesForYear);
      const totalPriceByCat = getTotalPriceByCategory(monthCat);
      setMonthCategory(totalPriceByCat);
    });

    return () => unsubscribe();
  }, [isDateChanged]);

  console.log("yearly total => ", totalSpent);

  return { yearlySpent:totalSpent, monthCategory, allExpenses };
}

export default getYearlyTotal;
