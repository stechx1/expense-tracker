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
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddIncomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = getAuth(app)
  const [loading,setLoading] = useState(false)
  const [tabs,setTabs] = useState(1)

  const handleOk = () => {
    dispatch(toggleModalFunction(!isModalOpen));
  };
  const handleCancel = () => {
    dispatch(toggleModalFunction(!isModalOpen));
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
        const docRef = await addDoc(incomeRef, {
          date: date.toISOString(),
          income,
          description,
          source,
          extraPayment:tabs == 1 ? 'Normal' : tabs == 2 ? 'Extra': '',
          recurring : recurring || null, 
          createdAt: new Date(),
          isRecurr : false
          
        });
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
        title="Add Income"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}

      >
        <div className="flex items-center gap-x-3">
             <Button style={{backgroundColor:tabs == 1 ? '#e4d00a' :'#eedc82'}} onClick={()=>handleTabs(1)}>Add Income</Button>
             <Button style={{backgroundColor:tabs == 2 ? '#e4d00a' :'#eedc82'}} onClick={()=>handleTabs(2)}>Extra Payment</Button>
             <Button style={{backgroundColor:tabs == 3 ? '#e4d00a' :'#eedc82'}} onClick={()=>handleTabs(3)}>Recurring Payment</Button>
        </div>
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
          initialValues={{
            remember: true,
          }}
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
            <InputNumber  type="number" placeholder="Income" />
          </Form.Item>
          <Form.Item
            style={{ maxWidth: "100%" }}
            name={"source"}
            rules={[
              { required: true, message: "Source of income is required" },
              {required:true,max:100,message:'Source limit must be less than on equal to 100 charactors'}
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
            <DatePicker />
          </Form.Item>
          {tabs == 3 && <Form.Item
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

          <Form.Item name="description"
           rules={[
            {required:true,message:"Please add comment."},
            {required:true,message:'Comment length can not be greater than 500 charactors',max:500}
          ]}
          >
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

export default AddIncomeModal;
