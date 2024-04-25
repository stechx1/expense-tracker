/* eslint-disable @next/next/no-img-element */
"use client";
import { DatePicker, InputNumber, Select } from "antd";
import { DataTable } from "../../components/DataTable";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { app, db } from "../../firebase/firebase";
import { categories } from "../../data/categories";

import { getAuth } from "firebase/auth";
import withAuth from "@/app/HOC/withAuth";
import { DoughnutChart } from "@/app/components/DoughnutChart";
const { RangePicker } = DatePicker;

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const Filter = () => {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [filterData, setFilterData] = useState({
    to: 0,
    from: 0,
    category: null,
    startDate: null,
    endDate: null,
  });

  const [result,setResult] = useState([])

  const onDateChange = (e) => {
    setFilterData({
      ...filterData,
      startDate: new Date(e[0]).toISOString(),
      endDate: new Date(e[1]).toISOString(),
    });
  };

  const handleChange = (e, type) => {
    setFilterData({ ...filterData, [type]: e });
  };

  const handleSubmit = (values) => {
    const category = values["category"];
    const expenseEnd = values["expenseEnd"];
    const expenseStart = values["expenseStart"];
    const dates = values["startDate"];
    const startDate = dates[0];
    const endDate = dates[1];
    
    const q = query(
      collection(db, "users", currentUser.uid, "expenses"),
      where("date", ">=", startDate?.toISOString()),
      where("date", "<=", endDate?.toISOString()),
      // where("expense", ">=",expenseStart),
      // where("expense","<=",expenseEnd),
      // where("category" ,"==",category),
      // orderBy("expense","desc"),
      // orderBy("category","desc")
     
     
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let exp =[]
      console.log("snapshot ==> ",snapshot)
      snapshot.forEach((doc) => {
        const data = doc.data();
         console.log("snap shot data => ",data)
         exp.push({id:doc.id,...data})
      });
      
      
        setResult(exp.map(item=>{
          
               if(item?.expense >= expenseStart && item?.expense <= expenseEnd && item?.category == category){
                    return item
               }
               
        }).filter(i=>i != undefined))

        console.log("exp ==> ",exp)
      
        
    });
  };
console.log(result)



  return (
    <main className="container mx-auto ">
      <div className="flex justify-between max-w-[1542px] mx-auto p-1">
        <div className="w-[40%] h-screen mr-10">
          {/* Left side */}
          <div className="flex flex-col gap-6 my-4">
            {/* FILTERS */}
            <Form
              layout="vertical"
              size="large"
              name="basic"
              wrapperCol={{
                span: 50,
              }}
              style={{
                paddingTop: "20px",
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              onFinishFailed={() => ""}
              autoComplete="off"
            >
              <Form.Item
                style={{
                  maxWidth: "100%",
                }}
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your start date!",
                  },
                ]}
              >
                <RangePicker onChange={(e) => onDateChange(e)} />
              </Form.Item>

              <div className="flex justify-between">
                <Form.Item
                  label="From Expense"
                  style={{
                    maxWidth: "100%",
                  }}
                  name="expenseStart"
                  rules={[
                    {
                      required: true,
                      message: "Please input expense!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(e, "from")}
                  />
                </Form.Item>

                <Form.Item
                  label="To Expense"
                  name="expenseEnd"
                  rules={[
                    {
                      required: true,
                      message: "Please input your end date!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="100000"
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(e, "to")}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input category!",
                  },
                ]}
              >
                <Select
                  placeholder="Categories"
                  options={categories}
                  onChange={(e) => handleChange(e, "category")}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 50,
                }}
                style={{ width: "100%" }}
              >
                <Button
                  loading={loading}
                  type="primary"
                  className="w-[100%]"
                  htmlType="submit"
                >
                  Filter
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="w-[60%]">
          <div className="my-8">
            <DataTable expenses={result} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Filter);
