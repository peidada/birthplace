import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const AddRole = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        新增角色
      </Button>
      <Modal
        title="新增角色"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>新增角色list</span>
      </Modal>
    </div>
  );
};

export default AddRole;
