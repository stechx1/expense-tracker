import { app, db } from "@/app/firebase/firebase";
import { toggleModalFunction } from "@/app/redux/IncomeSlice";
import { CheckCircleFilled, CheckOutlined, CloseOutlined, PlusCircleOutlined, XOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const GenerateIncomeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    id: Date.now(),
    name: null,
    amount: null,
    description: null,
  });
  const [itemList, setItemList] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleAddList = (type, text) => {
    console.log("text => ", text.value);
    setInputs({ ...inputs, [type]: text.target.value });
  };

  const handleItemListBtn = () => {
    setItemList((pre) => [...pre, inputs]);
    setInputs({ amount: null, description: null, name: null,id:Date.now() });
  };

  const [isPaid,setIsPaid] = useState(false)
  const onChange = (checked) => {
    setIsPaid(checked)
  };

  const handleSubmit = async (values) => {
    console.log("values ==> ", values);

    if(itemList.length == 0){
          toast.error("please add atleast one item",{style:{color:'white',backgroundColor:'red'}})
          return
    }
    setLoading(true);

    const dueDate = values["dueDate"];
    const customerName = values['customerName']
    const address = values["address"]
    const contactNo = values['contactNo']
    const items = itemList

    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
        const invoiceRef = collection(db, "users", currentUser.uid, "invoice");
        const docRef = await addDoc(invoiceRef, {
          dueDate: new Date(dueDate).toISOString(),
          customerName,
          address,
          contactNo,
          items,
          createdAt: new Date(),
          isPaid
        });
        form.resetFields();

        setLoading(false);
        handleOk();
        setItemList([])
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
            name="customerName"
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
            name="address"
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
            name="contactNo"
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
          name={'dueDate'}
          rules={[
            {
              required: true,

              message: "Due date is required is required.",
            },
          ]}
         >
             <DatePicker placeholder="Due date" />
         </Form.Item >
           <h3 className="font-bold font-serif">Status <small>(paid/unpaid)</small></h3>
           <Switch  onChange={onChange} unCheckedChildren={<CloseOutlined/>} checkedChildren={<CheckOutlined/>} />
          <Form.Item
            wrapperCol={{
              span: 50,
            }}
          >
            <div className="border-[1px] border-slate-100 rounded-lg p-2 my-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-x-1">
                  <Input
                    value={inputs.name}
                    placeholder="Item name ..."
                    onChange={(e) => handleAddList("name", e)}
                  />

                  <InputNumber
                    onChange={(e) => setInputs({ ...inputs, amount: e })}
                    type="number"
                    placeholder="Amount..."
                    style={{ width: "100%" }}
                    value={inputs.amount}
                  />
                </div>

                <TextArea
                  onChange={(e) => handleAddList("description", e)}
                  placeholder="Description ..."
                  value={inputs.description}
                />
              </div>

              <button
                onClick={handleItemListBtn}
                disabled={!inputs.name && !inputs.amount && !inputs.description}
                className=" flex items-center relative p-2 border-[1px] gap-x-2 rounded-md w-[80px] justify-center font-bold bg-blue-500 text-white  my-2"
              >
                <p>Add</p>
                <p className="absolute top-[14px] right-1">{itemList.length > 0 && <div className="h-4 w-4 rounded-full bg-white text-black text-center text-[12px]">{itemList.length}</div>}</p>
              </button>
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
