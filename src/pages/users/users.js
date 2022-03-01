import React from 'react';
import { connect } from 'dva';
import styles from './users.less';
import { Button } from 'antd';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //组件将要渲染时拿到默认的一页多少条和当前页这些数据
    // console.log(process.env.API_ENV);
  }

  buttonClick = () => {
    console.log(process.env.NODE_ENV);
    // this.props.dispatch({
    //   type: 'usersModel/getUser',
    //   payload: 1,
    // });
  };

  render() {
    return (
      <div>
        <Button size="small" type="ghost" onClick={e => this.buttonClick()}>
          Start
        </Button>
        <span style={{ marginLeft: '20px' }}>
          if !(window.localStorage.getItem('Token')) history.push('/login')
        </span>
      </div>
    );
  }
}

//类型检测 检测item属性是否是object类型 通过isRequired检测props中某个必要的属性 (object/func/array)
UsersPage.propTypes = {
  // item:PropTypes.object.isRequired
};

export default connect(({ usersModel }) => ({
  usersModel,
}))(UsersPage);
