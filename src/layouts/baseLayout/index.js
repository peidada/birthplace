import React from 'react';
import { Layout, Menu, Dropdown, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { history } from 'umi';
import MenuList from './menu/index.js';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default props => {
  console.log(props);
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
        <MenuList></MenuList>
      </Sider>
      <Layout>
        <Header className={styles['site-layout-sub-header-background']}>
          <Dropdown
            placement="bottomCenter"
            arrow
            trigger="click"
            overlay={
              <Menu
                onClick={data => {
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
