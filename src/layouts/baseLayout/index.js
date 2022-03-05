import React from 'react';
import { Layout, Menu, Dropdown, message } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default props => {
  return (
    <Layout className={styles['app']}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={styles['logo']}>birthplace</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            角色管理
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles['site-layout-sub-header-background']}>
          <Dropdown
            placement="bottomCenter"
            arrow
            overlay={
              <Menu
                onClick={data => {
                  console.log(data);
                  message.info(`Click on item ${data.key}`);
                  if (data.key === 'logout') {
                    window.localStorage.removeItem('Token');
                    history.push('/login');
                  }
                }}
              >
                <Menu.Item key="personal">个人中心</Menu.Item>
                <Menu.Item key="logout">退出登录</Menu.Item>
              </Menu>
            }
          >
            <UserOutlined
              className={styles['icon-user']}
              onClick={e => e.preventDefault()}
            ></UserOutlined>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className={styles['site-layout-background']}
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Where the dream began</Footer>
      </Layout>
    </Layout>
  );
};
