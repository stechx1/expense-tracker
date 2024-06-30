"use client";
import { toggleModalFunction } from "@/app/redux/IncomeSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIncomeModal from "./AddIncomeModal";

const AddIncome = () => {
  const isModalOpen = useSelector((state) => state?.IncomeSlice?.isModalOpen);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(toggleModalFunction(!isModalOpen));
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "#219653", color: "white" }}
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Add Income
      </Button>
      <AddIncomeModal isModalOpen={isModalOpen} />
    </div>
  );
};

export default AddIncome;
