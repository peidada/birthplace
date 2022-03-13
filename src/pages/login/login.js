import React from 'react';
import styles from './login.less';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { connect, Link } from 'umi';

class Login extends React.Component {
  constructor(props) {
    console.log(props, 'props');
    super(props);
    this.state = {
      type: '0',
      codeLoading: false,
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

  formRef = React.createRef();

  componentDidMount() {}

  onFinish = values => {
    console.log('Success:', values);
    let url =
      this.state.type === '0' ? 'loginModel/loginP' : 'loginModel/login';
    this.props.dispatch({
      type: url,
      payload: values,
    });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  changeLoginType = e => {
    console.log(e);
    this.setState({
      type: e.target.value,
    });
    /* 切换登录方式验证码清空 */
    this.props.dispatch({
      type: 'getVertificationCode/saveCode',
      payload: '',
    });
  };
  getCode = () => {
    this.formRef.current
      ?.validateFields(['mobile'])
      .then(values => {
        this.props.dispatch({
          type: 'getVertificationCode/getCode',
          payload: values,
        });
      })
      .catch(errorInfo => {});
  };

  render() {
    const { type, codeLoading, code } = this.state;
    /* 重置code值 */
    this.formRef.current?.setFieldsValue({ code: code });
    return (
      <div className={styles.login_div}>
        <div className={styles.login_title}>星图变幻莫测，探测之</div>
        <Form
          name="normal_login"
          ref={this.formRef}
          className={styles['login-form']}
          initialValues={{ code: code }}
          onFinish={e => this.onFinish(e)}
          onFinishFailed={e => this.onFinishFailed(e)}
        >
          <Radio.Group
            value={type}
            onChange={this.changeLoginType}
            className={styles['login-radio']}
          >
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
            rules={[
              {
                required: true,
                message: '请正确填写手机号!',
                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              },
            ]}
          >
            <Input
              prefix={
                <PhoneOutlined className={styles['site-form-item-icon']} />
              }
              placeholder="Mobile"
            />
          </Form.Item>
          {type === '0' ? (
            <Form.Item
              name="password"
              rules={[{ required: true, message: '必填项不能为空' }]}
            >
              <Input
                prefix={
                  <LockOutlined className={styles['site-form-item-icon']} />
                }
                type="password"
                placeholder="密码"
              />
            </Form.Item>
          ) : (
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
          )}
          <Form.Item
            className={
              type === '0'
                ? styles['dispalyNone']
                : styles['site-form-item-div']
            }
          >
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
