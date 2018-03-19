import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getCurrentMenu } from '../../utils';

const { SubMenu } = Menu;
class Menus extends React.PureComponent {
    onOpenChange = (nextOpenKeys) => {
        const { updateOpenKeys, openKeys } = this.props;
        const latestOpenKey = nextOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
        let newOpenKeys = [];
        if (latestOpenKey) {
            newOpenKeys = [].concat(latestOpenKey);
        }
        updateOpenKeys(newOpenKeys);
    };

    menuClickHandle = () => {
        const { callback } = this.props;
        callback && callback(false);
    };

    getMenus = menus =>
        menus.map((menu, i) => {
            if (!menu.child || menu.child.length == 0) {
                return (
                    <Menu.Item key={'menu' + menu.id}>
                        <Link
                            to={menu.router}
                            target={undefined}
                            replace={menu.router === this.props.location.pathname}

                        >
                            {<span>{menu.icon && <Icon type={menu.icon}/>}<span className="nav-menu-text">{menu.name}</span></span>}
                        </Link>
                    </Menu.Item>
                );
            }
            return (
                <SubMenu
                    key={'sub' + menu.id}
                    title={<span>{menu.icon && <Icon type={menu.icon} />}<span className="nav-sub-text">{menu.name}</span></span>}
                >
                    {this.getMenus(menu.child)}
                </SubMenu>
            );
        })

    render() {
        const {
            menus,
            menuTheme,
            openKeys,
            location,
            collapsed,
        } = this.props;

        const menuProps = collapsed ? {} : {
            openKeys,
        };

        let activeKey = '';
        let current = getCurrentMenu(location.pathname);
        if (current) {
            activeKey = 'menu' + current.id;
        }

        return (
            <Menu
                key="Menu"
                {...menuProps}
                mode='inline'
                theme={menuTheme}
                selectedKeys={[activeKey]}
                onOpenChange={this.onOpenChange}
                onClick={this.menuClickHandle}
                style={{ padding: '16px 0', width: '100%' }}
            >
                {this.getMenus(menus, '')}
            </Menu>
        );
    }
}

Menus.propTypes = {
    menus: PropTypes.array,
    openKeys: PropTypes.array,
    collapsed: PropTypes.bool,
    menuTheme: PropTypes.string,
    callback: PropTypes.func,
    updateOpenKeys: PropTypes.func,
    location: PropTypes.object,
};

export default Menus;
