import { Button, Form, InputNumber, Progress } from "antd";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { app, db } from "../firebase/firebase";
import { DeleteOutlined } from "@ant-design/icons";

export const SavingCard = ({ savingItem }) => {

  const auth = getAuth(app)
  const currentUser = auth.currentUser
  const price =
    parseInt(savingItem?.goalAmount) - parseInt(savingItem?.savingAmount);
  const pricePercentage =
    (parseInt(savingItem?.savingAmount) * 100) /
    parseInt(savingItem?.goalAmount);
  const [showDetails, setShowDetails] = useState(null);
  const [saving,setSaving] = useState(null)
  const calculate =
    price <= 0 ? (
      "Goal has already been acheived"
    ) : (
      <>
        <span className="font-bold text-3xl">{price}</span>{" "}
        <span className="font-bold"> more to go</span>
      </>
    );

    const updatehanlder =async(id)=>{
        console.log("diiii ==> ",id)
      try {
        const addSaving = parseInt(savingItem?.savingAmount) + parseInt(saving)
        const docRef = doc(db, "users", currentUser.uid, "savings", id);
        await updateDoc(docRef, {savingAmount:addSaving});
      } catch (error) {
        console.log("update document error ==> ", error);
      }
      finally{
         setSaving(null)
      }
    }

    const handleDelete = async (savingId) => {
      try {
        if (currentUser) {
          const expenseRef = doc(
            db,
            "users",
            currentUser.uid,
            "savings",
            savingId
          );
          await deleteDoc(expenseRef);
          
        } else {
          console.error("User not authenticated.");
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    };
  return (
    <div
      className="bg-white rounded-md shadow-lg drop-shadow-md shadow-gray-100 relative  overflow-hidden"
      onMouseLeave={() => setShowDetails(null)}
    >
      <div
        className="bg-primary p-4 rounded-t-md"
        onMouseEnter={() => setShowDetails(savingItem?.id)}
      >
        <h2 className="text-lg text-white font-bold">
          {new Date(savingItem?.date).toDateString()}
        </h2>
      </div>

      <div className="p-4">
        <div className="flex gap-1 w-[100%]">
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Saving"
            className="w-[100%]"
            onChange={(e)=>setSaving(e)}
          />
          <div>
            <Button disabled={(!saving || saving == 0 )?true : false} onClick={()=>updatehanlder(savingItem?.id)} className="w-fit">Add</Button>
          </div>
        </div>

        <div className="mb-4 mt-6">{calculate}</div>

        <div>
          <Progress
            strokeColor={"#219653"}
            percent={price <= 0 ? 100 : Math.ceil(pricePercentage)}
          />
        </div>
      </div>
      {
        <div
          className={`absolute transition-all duration-200  bg-[#ADF802] text-slate-700 rounded-b  w-full  ${
            showDetails ? "-top-1" : "-top-full"
          } p-2 `}
        >
          <div className="flex flex-col gap-x-2 relative">
                   
                    <h3 className="font-bold text-[18px] ">{savingItem?.savingFor}</h3>
                    <h3 className="font-bold text-[16px] ">{savingItem?.comments}</h3>
                    <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>handleDelete(savingItem?.id)}><DeleteOutlined style={{color:'red',fontSize:'22px'}}   /></div>
          </div>
        </div>
      }
    </div>
  );
};
