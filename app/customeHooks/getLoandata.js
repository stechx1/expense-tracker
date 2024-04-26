import {
  collection,
  getAggregateFromServer,
  onSnapshot,
  orderBy,
  query,
  sum,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function getLoandata() {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  const [loanData, setLoanData] = useState([]);
  const [givenLoan, setGivenLoan] = useState(0)
  const [takenLoan, setTakenLoan] = useState(0)

  useEffect(() => {
    const q = query(collection(db, "users", currentUser.uid, "loans"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot ==> ", snapshot);
      const loan = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loan.push({ id: doc.id, ...data });
      });
      setLoanData(loan);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const q1 = query(
        collection(db, "users", currentUser.uid, "loans"),
        where("loanType", "==", "Given")
      );
    
      const unsubscribe = onSnapshot(q1, (snapshot) => {
        console.log("snapshot ==> ", snapshot);
        let loan = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
           loan = loan + data?.amount
        });
        setGivenLoan(loan);
      });
     
     
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const q1 = query(
        collection(db, "users", currentUser.uid, "loans"),
        where("loanType", "==", "Taken")
      );
    
      const unsubscribe = onSnapshot(q1, (snapshot) => {
        console.log("snapshot ==> ", snapshot);
        let loan = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
           loan = loan + data?.amount
        });
        setTakenLoan(loan);
      });
     
     
    };
    getData();
  }, []);

  console.log("taken loan ",takenLoan)
  console.log("given loan ",givenLoan)

  return { loanData,takenLoan,givenLoan };
}

export default getLoandata;
