import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from './addRole.less';

const AddRole = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const values = formRef.current?.getFieldsValue(['name']);
    /* todo 暂时写死 */
    values.order = 1;
    values.status = 1;
    values.remark = '1';
    if (values.name) {
      props.addRoleRequest(values);
    }
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
        <Form name="role_form" ref={formRef} className={styles['role-form']}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your Role Name!' },
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          {/* <Form.Item name="status" valuePropName="checked">
            <Switch />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddRole;
