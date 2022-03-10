import React from 'react';
import { connect } from 'umi';
import styles from './portal.less';
import { message, Popconfirm, Space, Table } from 'antd';
import AddRole from './component/addRole';

class PortalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //组件将要渲染时拿到默认的一页多少条和当前页这些数据
    // console.log(process.env.API_ENV);
    this.getRoleRequest();
  }

  getRoleRequest = () => {
    this.props.dispatch({
      type: 'portalModel/getRole',
      payload: null,
    });
  };

  addRoleRequest = values => {
    this.props.dispatch({
      type: 'portalModel/addRole',
      payload: values,
    });
  };

  deleteRoleRequest = values => {
    this.props.dispatch({
      type: 'portalModel/deleteRole',
      payload: { id: values.id },
    });
  };

  editRoleClick = values => {
    message.success(values.id);
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
      {
        title: '操作',
        key: 'id',
        render: record => (
          <Space size="middle">
            <Popconfirm
              title="确定删除吗？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.deleteRoleRequest(record)}
            >
              <a>删除</a>
            </Popconfirm>
            <a onClick={() => this.editRoleClick(record)}>编辑</a>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <AddRole addRoleRequest={this.addRoleRequest}></AddRole>
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
