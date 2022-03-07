import React from 'react';
import styles from './index.less';
import { Link, connect } from 'umi';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getMenuListRequest();
  }

  getMenuListRequest = () => {
    this.props.dispatch({
      type: 'menuListModel/getMenuList',
      payload: null,
    });
  };

  render() {
    const { menuList } = this.props.menuListModel;
    const renderMenu = menuList => {
      return menuList.map(row => {
        if (row === undefined) return false;
        const { name, action, id, child } = row;
        if (child && child.length > 0) {
          const subMenu = renderMenu(child);
          return (
            <SubMenu key={id} title={<span>{name}</span>}>
              {subMenu}
            </SubMenu>
          );
        }
        return (
          <Item key={id} title={name}>
            {/* <Link to={{ pathname: action }}>
              <span>{name}</span>
            </Link> */}
            <span>{name}</span>
          </Item>
        );
      });
    };
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['1']}
      >
        {renderMenu(menuList)}
      </Menu>
    );
  }
}

MenuList.propTypes = {};

export default connect(({ menuListModel }) => ({
  menuListModel,
}))(MenuList);
