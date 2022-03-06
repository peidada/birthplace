import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './register.less';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { debounce } from 'lodash';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeLoading: false,
      mobile: '',
      code: '',
    };
  }

  /* props更新state */
  static getDerivedStateFromProps(props) {
    console.log(props);
    return {
      code: props.getVertificationCode.code,
    };
  }

  // 通过 Ref 来获取 Form 实例
  // 同样的，你可以不使用createRef()方法而用this.refs.XXX也可以
  formRef = React.createRef();

  // 通过 Form 的 Submit监听 得到字段值
  onFinish = values => {
    console.log(values);
    if (values.password != values.passwordAgain) {
      message.error('米缸躺？两次输入的不一样');
    } else {
      this.props.dispatch({
        type: 'registerModel/registerUser',
        payload: {
          mobile: values.mobile,
          password: values.password,
          code: this.props.getVertificationCode.code,
        },
      });
    }
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // getValues = () => {
  //   // 得到 Form 实例
  //   const form = this.formRef.current
  //   // 使用 getFieldsValue 获取多个字段值
  //   const values = form.getFieldsValue(['name', 'age'])
  //   console.log(values)
  // }

  // getValidateValues = async () => {
  //   const form = this.formRef.current
  //   // 使用 validateFields 获取验证后字段值
  //   try {
  //     const values = await form.validateFields(['name', 'age'])
  //     console.log(values)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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

  getCode = () => {
    this.props.dispatch({
      type: 'getVertificationCode/getCode',
      payload: { mobile: this.state.mobile },
    });
  };

  render() {
    const { codeLoading, code, mobile } = this.state;
    /* 重置code值 */
    this.formRef.current?.setFieldsValue({ code: code });
    return (
      <div className={styles.register_div}>
        <div className={styles.register_title}>星图变幻莫测，探测之</div>
        <Form
          name="normal_register"
          ref={this.formRef}
          className={styles['register-form']}
          initialValues={{ code: code }}
          onFinish={e => this.onFinish(e)}
          onFinishFailed={e => this.onFinishFailed(e)}
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}
            onChange={this.changeMobile}
          >
            <Input
              prefix={
                <PhoneOutlined className={styles['site-form-item-icon']} />
              }
              value={mobile}
              placeholder="Please input your Mobile"
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
              placeholder="Please input your Password"
            />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            rules={[
              { required: true, message: 'Please input your PasswordAgain!' },
            ]}
          >
            <Input
              prefix={
                <LockOutlined className={styles['site-form-item-icon']} />
              }
              placeholder="Please input your PasswordAgain"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '必填项不能为空' }]}
            name="code"
          >
            <Input
              prefix={<LockOutlined className={['site-form-item-icon']} />}
              placeholder="验证码"
              className={styles['vertificatoin-code-input']}
            />
          </Form.Item>
          <Form.Item className={styles['site-form-item-div']}>
            <Button
              type="primary"
              className={styles['vertificatoin-code-button']}
              loading={codeLoading}
              onClick={this.getCode}
            >
              获取验证码
            </Button>
          </Form.Item>
          <Form.Item>
            <Link className={styles['register-form-forgot']} to="/login">
              返回
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['register-form-button']}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  // item:PropTypes.object.isRequired
};

export default connect(({ registerModel, getVertificationCode }) => ({
  registerModel,
  getVertificationCode,
}))(Register);
