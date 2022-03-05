import React from 'react';
import { connect } from 'dva';
import styles from './login.less';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { debounce } from 'lodash';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '0',
      codeLoading: false,
      mobile: '',
    };
  }

  componentDidMount() {}

  onFinish = values => {
    console.log('Success:', values);

    this.props.dispatch({
      type: 'loginModel/loginP',
      payload: values,
    });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  changeLoginType = e => {
    console.log(e);
    this.setState({ type: e.target.value });
  };
  getCode = () => {
    console.log(111);
    this.props.dispatch({
      type: 'getVertificationCode/getCode',
      payload: { mobile: this.state.mobile },
    });
  };
  setMobile(e) {
    debounce(() => {
      this.setState({ mobile: e.target.value });
    }, 300)();
  }
  changeMobile = e => {
    e.persist();
    console.log(e, 'e');
    this.setMobile(e);
  };
  render() {
    const { type, codeLoading } = this.state;
    let loginType;
    if (type === '0') {
      loginType = (
        <Form.Item
          name="password"
          rules={[{ required: true, message: '必填项不能为空' }]}
        >
          <Input
            prefix={<LockOutlined className={styles['site-form-item-icon']} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
      );
    } else {
      loginType = (
        <Form.Item
          name="code"
          rules={[{ required: true, message: '必填项不能为空' }]}
        >
          <Input
            prefix={<LockOutlined className={styles['site-form-item-icon']} />}
            placeholder="验证码"
            className={styles['vertificatoin-code-input']}
          />
          <Button
            type="primary"
            className={styles['vertificatoin-code-button']}
            loading={codeLoading}
            onClick={this.getCode}
          >
            获取验证码
          </Button>
        </Form.Item>
      );
    }
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
          <Radio.Group value={type} onChange={this.changeLoginType}>
            <Radio.Button type="text" size="small" value="0">
              密码登录
            </Radio.Button>
            <Radio.Button type="text" size="small" value="1">
              验证码登录
            </Radio.Button>
          </Radio.Group>
          <Form.Item
            className={styles['mobile']}
            name="mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}
            onChange={this.changeMobile}
          >
            <Input
              prefix={
                <PhoneOutlined className={styles['site-form-item-icon']} />
              }
              placeholder="Mobile"
            />
          </Form.Item>
          {loginType}
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

export default connect(({ loginModel, getVertificationCode }) => ({
  loginModel,
  getVertificationCode,
}))(Login);
