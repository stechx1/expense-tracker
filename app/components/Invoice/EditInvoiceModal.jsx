import singleInvoice from "@/app/customeHooks/singleInvoice";
import singleIncomeData from "../../customeHooks/singleIncomeData";
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
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";

const EditInvoiceModal = ({ isModalOpen, setIsModalOpen, modalData }) => {
 
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = getAuth(app);
  const [status,setStatus] = useState(modalData?.isPaid)
  const [loading, setLoading] = useState(false);
  const [itemList,setItemList] = useState([])
  console.log("itmmm list => ",itemList)
  const { updateDocHandler } = singleInvoice();
  const initialvlaue = {
    dueDate: dayjs(modalData?.dueDate),
    customerName: modalData?.customerName,
    address: modalData?.address,
    contactNo: modalData?.contactNo,
    items: modalData?.items,
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    
    setLoading(true);

    const dueDate = values["dueDate"];
    const customerName = values["customerName"];
    const address = values["address"];
    const contactNo = values["contactNo"];
    const items = initialvlaue.items;
    
    const updatedArray1 = items?.filter(item1 => !itemList.some(item2 => item1.id == item2.id))
    const resultArray = [...updatedArray1, ...itemList];
    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
        if (currentUser) {
          updateDocHandler(modalData?.id, {
            dueDate: dueDate.toISOString(),
            customerName,
            address,
            contactNo,
            isPaid:status,
            items:resultArray,
          });
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
   const [open,setOpen] = useState(false)
   const [itemData,setItemData] = useState(null)
  const handleEdit =(item)=>{
      console.log("item => ",item)
      setOpen(true)
      setItemData(item)
     
  }

  const handleStatus =(checked)=>{
        setStatus(checked)
  }

  return (
    <div>
      <Modal
        styles={{ footer: { display: "none" } }}
        title="Edit Invoice"
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
            name="customerName"
            rules={[
              {
                required: true,

                message: "Customer name is required",
              },
            ]}
          >
            <Input
              defaultValue={initialvlaue.customerName}
              placeholder="Customer name..."
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,

                message: "Address is required",
              },
            ]}
          >
            <Input
              defaultValue={initialvlaue.address}
              placeholder="Adress..."
            />
          </Form.Item>
          <Form.Item
            name="contactNo"
            rules={[
              {
                required: true,

                message: "Contact is required",
              },
            ]}
          >
            <Input
              defaultValue={initialvlaue.contactNo}
              placeholder="contact..."
            />
          </Form.Item>

          <Form.Item
            style={{
              maxWidth: "100%",
            }}
            name="dueDate"
            rules={[
              {
                required: true,
                message: "Please input due date!",
              },
            ]}
          >
            <DatePicker defaultValue={initialvlaue.dueDate} />
          </Form.Item>

             <p>Status <small>(paid/unpaid)</small></p>
            <Switch defaultChecked={status} checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}  onChange={handleStatus} />

          <Form.Item
            wrapperCol={{
              span: 50,
            }}
          >
            <div className="border border-slate-100 rounded-md p-2 mt-2">
              {modalData?.items?.map((data, index) => (
                <div className="flex my-2 flex-col gap-y-2 border-b-[1px] border-b-50 boder-1 p-2 relative" onClick={()=>handleEdit(data)}>
                   <div className="absolute top-2 right-2"><EditOutlined color="green" /></div>
                  <div>
                    <p className="font-bold">Name: </p>
                    {data?.name}
                  </div>
                  <div>
                    <p className="font-bold">Amount:</p> {data?.amount}
                  </div>
                  <div>
                    <p className="font-bold">Description:</p>
                    {data?.description}
                  </div>
                </div>
              ))}
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
      {itemData && <ItemModal itemData={itemData} open={open} setOpen={setOpen} setItemList={setItemList} itemList={itemList} setItemData={setItemData}  />}
    </div>
  );
};

export default EditInvoiceModal;

const ItemModal = ({open, setOpen, itemData,setItemList,itemList,setItemData}) => {

  const [form] = Form.useForm();

  const initialvlaue = {
    name: itemData? itemData?.name : null,
    amount: itemData ? itemData?.amount: null,
    description : itemData ? itemData?.description : null
  };

  const handleCOnfirm =(values)=>{
     console.log("list item ",itemList)
    const name = values["name"];
    const description = values["description"];
    const amount = values["amount"];
    const id = itemData?.id
    
      const itemss = itemList.filter(ab=> !(ab?.name == name && ab?.amount == amount && ab?.description == description && ab?.id == id ))
      let updatedList = itemList.filter(item => item.id !== id);

// Add the new item
updatedList.push({ name, description, amount, id });

// Update the state
setItemList(updatedList); 
            
       
      
      setItemData(null)
      form.resetFields()
      setOpen(false)

  
  }

  return (
    <Modal
      styles={{ footer: { display: "none" } }}
      title="Edit Item"
      open={open}
      okButtonProps={{style:{display:'none'}}}
      onCancel={() => setOpen(false)}
      cancelButtonProps={{style:{display:'none'}}}
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
          onFinish={handleCOnfirm}
          onFinishFailed={()=>setOpen(false)}
          autoComplete="off"
        >
      <Form.Item
        name="name"
        
        rules={[
          {
            required: true,

            message: "name is required",
          },
        ]}
      >
        <Input
        
          placeholder="Item name..."
        />
      </Form.Item>
      <Form.Item
        name="amount"
        rules={[
          {
            required: true,

            message: "Amount is required",
          },
        ]}
      >
        <InputNumber
          
          placeholder="Amount..."
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,

            message: "Description is required",
          },
        ]}
      >
        <TextArea
          
          placeholder="Description..."
        />
      </Form.Item>
      <div className="flex justify-end">
              <div className="flex gap-x-1">
                
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </div>
      </Form>
    </Modal>
  );
};
