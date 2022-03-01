import React from 'react';
import { connect } from 'dva';
import styles from './login.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onFinish = values => {
    console.log('Success:', values);

    this.props.dispatch({
      type: 'loginModel/login',
      payload: values,
    });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div className={styles.login_div}>
        <div className={styles.login_title}>星图变幻莫测，探测之</div>
        <Form
          name="normal_login"
          className={styles['login-form']}
          initialValues={{ remember: true }}
          onFinish={e => this.onFinish(e)}
          onFinishFailed={e => this.onFinishFailed(e)}
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}
          >
            <Input
              prefix={
                <PhoneOutlined className={styles['site-form-item-icon']} />
              }
              placeholder="Mobile"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={
                <LockOutlined className={styles['site-form-item-icon']} />
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link className={styles['login-form-forgot']} to="/register">
              注册
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['login-form-button']}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  // item:PropTypes.object.isRequired
};

export default connect(({ loginModel }) => ({
  loginModel,
}))(Login);
