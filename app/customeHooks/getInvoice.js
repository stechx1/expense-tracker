import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const getInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;

    const incomeCollection = collection(db, "users", currentUser.uid, "invoice");
    const q = query(incomeCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let allInvoices = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        allInvoices.push({ ...data, id });
       
      });
     
      setInvoices(allInvoices);
     
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { invoices};
};

export default getInvoice
