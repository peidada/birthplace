import React from 'react';
import { connect } from 'dva';
import styles from './portal.less';
import { Button, message, Table } from 'antd';

class PortalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //组件将要渲染时拿到默认的一页多少条和当前页这些数据
    // console.log(process.env.API_ENV);
    this.buttonClick();
  }

  buttonClick = () => {
    this.props.dispatch({
      type: 'portalModel/getRole',
      payload: null,
    });
  };

  addRole = () => {
    message.error('啥也想新增？猪脑子？');
  };

  render() {
    const { roleData } = this.props.portalModel;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'list_order',
        dataIndex: 'list_order',
        key: 'list_order',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
    ];
    return (
      <div>
        <Button type="primary" onClick={e => this.addRole(e)}>
          新增角色
        </Button>
        <Table
          dataSource={roleData}
          columns={columns}
          rowKey={record => record.id}
          className={styles['role-table']}
        ></Table>
      </div>
    );
  }
}

//类型检测 检测item属性是否是object类型 通过isRequired检测props中某个必要的属性 (object/func/array)
PortalPage.propTypes = {
  // item:PropTypes.object.isRequired
};

export default connect(({ portalModel }) => ({
  portalModel,
}))(PortalPage);
