import { app, db } from "@/app/firebase/firebase";
import { toggleModalFunction } from "@/app/redux/IncomeSlice";
import { PlusCircleOutlined } from "@ant-design/icons";
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

const GenerateIncomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(1);

  const handleOk = () => {
    dispatch(toggleModalFunction(!isModalOpen));
  };
  const handleCancel = () => {
    dispatch(toggleModalFunction(!isModalOpen));
  };

  const handleTabs = (tabIndex) => {
    setTabs(tabIndex);
  };

  const handleSubmit = async (values) => {
    console.log("values ==> ", values);
    setLoading(true);

    const date = values["date"];
    const income = values["income"];
    const source = values["source"];
    const description = values["description"];
    const recurring = values["recurring"];

    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
        const incomeRef = collection(db, "users", currentUser.uid, "income");
        const docRef = await addDoc(incomeRef, {
          date: date.toISOString(),
          income,
          description,
          source,
          extraPayment: tabs == 1 ? "Normal" : tabs == 2 ? "Extra" : "",
          recurring: recurring || null,
          createdAt: new Date(),
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
        title="Generate Invoice"
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
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={() => ""}
          autoComplete="off"
        >
          <Form.Item
            name="CustomerName"
            rules={[
              {
                required: true,

                message: "Customer name is required.",
              },
            ]}
          >
            <Input placeholder="Customer Name" />
          </Form.Item>
          <Form.Item
            name="Address"
            rules={[
              {
                required: true,

                message: "Address is required.",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="ContactNo"
            rules={[
              {
                required: true,

                message: "Contact number is required is required.",
              },
            ]}
          >
            <Input placeholder="Contact number" />
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
            <DatePicker placeholder="Due date" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 50,
            }}
          >
            <div className="border-[1px] border-slate-100 rounded-lg p-2">
            
                <div>
                  <div className="flex items-center gap-x-1"> 
                    <Form.Item
                      name="ItemName"
                      rules={[
                        {
                          required: true,
                          message: "item name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Item name ..." />
                    </Form.Item>
                    
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                pattern: /^(?!0(\.0+)?$)(\d+(\.\d+)?)$/,
                message: "Amount must be greater than zero",
              },
            ]}
          >
            <InputNumber type="number" placeholder="Amount..." style={{width:'100%'}} />
          </Form.Item>
                  </div>

                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Description is required",
                      },
                    ]}
                  >
                    <TextArea placeholder="Description ..." />
                  </Form.Item>
                </div>
            

              <div
                onClick={() => setNumberOfItems((pre) => pre + 1)}
                className=" flex items-center p-2 border-[1px] gap-x-2 rounded-md w-fit cursor-pointer border-[#12522E]"
              >
                Add Item
                
              </div>
            </div>
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

export default GenerateIncomeModal;
