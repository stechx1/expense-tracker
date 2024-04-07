import { Modal } from 'antd';
export const EditModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title='Edit Expense'
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
