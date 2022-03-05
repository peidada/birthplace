import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from './addRole.less';

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
        <Form
          name="role_form"
          className={styles['role-form']}
          initialValues={{ remember: true }}
          onFinish={e => this.onFinish(e)}
          onFinishFailed={e => this.onFinishFailed(e)}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your Role Name!' },
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRole;
