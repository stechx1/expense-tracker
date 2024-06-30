import singleIncomeData from "../../customeHooks/singleIncomeData"
import { app, db } from "@/app/firebase/firebase";
import { toggleModalFunction } from "@/app/redux/IncomeSlice";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const EditIncomeModal = ({ isModalOpen, setIsModalOpen,modalData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = getAuth(app)
  const [loading,setLoading] = useState(false)
  const {updateDocHandler} = singleIncomeData()
  const initialvlaue = {
    date :dayjs(modalData?.date),
    income:modalData?.income,
    extraPayment:modalData?.extraPayment,
    recurring:modalData?.recurring,
    description:modalData?.description,
    source:modalData?.source
    
    
}
  const handleOk = () => {
    setIsModalOpen(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleTabs =(tabIndex)=>{

      setTabs(tabIndex)
  }

  const handleSubmit = async (values) => {
    
    console.log("values ==> ",values)
    setLoading(true);

    const date = values["date"];
    const income = values["income"];
    const source = values["source"];
    const description = values["description"];  
    const recurring = values['recurring']

    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
        const incomeRef = collection(
          db,
          "users",
          currentUser.uid,
          "income"
        );
        if (currentUser) {
            updateDocHandler(modalData?.id,{date:date.toISOString(),income,source,description,recurring})
           setLoading(false);
           handleOk();
         }
        form.resetFields();
        
        setLoading(false);
        handleOk();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        styles={{ footer: { display: "none" } }}
        title="Edit Income"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}

      >
       
        <Form
          size="large"
          form={form}
          
          wrapperCol={{
            span: 50,
          }}
          style={{
            paddingTop: "20px",
            maxWidth: 800,
          }}
          initialValues={initialvlaue}
          onFinish={handleSubmit}
          onFinishFailed={() => ""}
          autoComplete="off"
         
        >
          <Form.Item
            name="income"
            rules={[
              {
                required: true,
                pattern: /^(?!0(\.0+)?$)(\d+(\.\d+)?)$/,
                message: "Expense must be greater than zero",
              },
            ]}
          >
            <InputNumber defaultValue={initialvlaue.income} type="number" placeholder="Income" />
          </Form.Item>
          <Form.Item
            style={{ maxWidth: "100%" }}
            name={"source"}
            rules={[
              { required: true, message: "Source of income is required" },
            ]}
          >
            <Input placeholder="Source of income or Client" />
          </Form.Item>
          <Form.Item
            style={{
              maxWidth: "100%",
            }}
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your date!",
              },
            ]}
          >
            <DatePicker defaultValue={initialvlaue.date} />
          </Form.Item>
          {modalData?.recurring  && <Form.Item
            style={{
              maxWidth: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Please enter recurring intervel!",
              },
            ]}
            name="recurring"
            
          >
            <Select placeholder={'Please one of the option'} options={[{label:'daily',value:'daily'},{label:'weekly',value:'weekly'},{label:'monthly',value:'monthly'}]} />
          </Form.Item>}

          <Form.Item name="description">
            <TextArea placeholder="Add your comment" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 50,
            }}
          >
            <div className="flex justify-end">
              <div className="flex gap-x-1">
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={handleCancel}
                  className="bg-red-600"
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditIncomeModal;
