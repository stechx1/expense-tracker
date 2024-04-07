import { Modal } from 'antd';

export const AddExpenseModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title='Add Expense'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
