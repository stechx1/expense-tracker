import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

function useUpdateLoanData() {
  const [update, setUpdate] = useState();
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  const updateDocHandler = async (id, updateData) => {
    try {
      const docRef = doc(db, "users", currentUser.uid, "loans", id);
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.log("update document error ==> ", error);
    }
  };

  return { updateDocHandler };
}

export default useUpdateLoanData;
