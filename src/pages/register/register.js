import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './register.less';
import { history } from 'umi';
import { debounce } from 'lodash';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
class Register extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'props');
    this.state = {
      mobile: '',
      code: '',
    };
    this.mobileInput = debounce(this.mobileInput, 300);
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

  mobileInput = value => {
    console.log('value', value);
    this.setState({
      mobile: value,
    });
  };

  back = () => {
    history.push('/login');
  };

  getCode = () => {
    this.props.dispatch({
      type: 'getVertificationCode/getCode',
      payload: { mobile: this.state.mobile },
    });
  };

  handleChangeMobile = e => {
    e.persist();
    this.mobileInput(e.target.value);
  };

  render() {
    const { Item } = Form;
    return (
      <div className={styles.register_div}>
        <div className={styles.register_title}>星图变幻莫测，探测之</div>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          className={styles.register_form}
          {...layout}
        >
          <Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}
          >
            <Input
              onChange={this.handleChangeMobile}
              value={this.state.mobile}
            />
          </Item>
          <Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Item>
          <Item
            name="passwordAgain"
            label="PasswordAgain"
            rules={[
              { required: true, message: 'Please input your passwordAgain!' },
            ]}
          >
            <Input.Password />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.register_form_button}
            >
              注册
            </Button>
            <Button
              type="primary"
              onClick={this.back}
              className={styles.register_form_button_back}
            >
              Back
            </Button>
            <Button
              type="primary"
              onClick={this.getCode}
              className={styles.register_form_button_code}
            >
              获取验证码
            </Button>
            {/* <Button type='link' onClick={this.getValues}>非 Submit 方式（不验证）</Button>
          <Button type='link' onClick={this.getValidateValues}>非 Submit 方式（验证）</Button> */}
          </Item>
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
