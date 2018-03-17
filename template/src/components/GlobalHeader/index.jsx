import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Popover, Spin, Divider, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Menus from '../Menus';
import styles from './index.less';

class GlobalHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.menu = (
            <Menu className={styles.menu}>
                <Menu.Item>
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
    }
    handleLogOut = () => {
        const { logout } = this.props;
        logout().payload.promise.then((res) => {
            if (res.payload.data && res.payload.data.code == 0) {
                const ssoURL = (res.payload.data && res.payload.data.data) || '';
                window.location.href = ssoURL + encodeURIComponent(window.location.href);
            }
        });
    }

    render() {
        console.log('Header');
        const {
            user,
            menus,
            openKeys,
            collapsed,
            updateOpenKeys,
            switchMenuPopover,
            isMobile,
            menuPopoverVisible,
            toggle,
            logo,
            location,
        } = this.props;

        const menusProps = {
            menus,
            openKeys,
            collapsed: false,
            menuTheme: 'light',
            callback: switchMenuPopover,
            updateOpenKeys,
            location,
        };
        return (
            <div className={styles.header}>
                {
                    isMobile ?
                        ([
                            (
                                <Link to="/" className={styles.logo} key="logo">
                                    <img style={{ verticalAlign: 'middle' }} src={logo} alt="logo" width="32" />
                                </Link>
                            ),
                            <Divider type="vertical" key="line" />,
                        ]) : null
                }
                {
                    isMobile ?
                        <Popover overlayClassName='popover-menu' placement='bottomLeft' trigger='click'
                            onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                            content={<Menus {...menusProps}/>}>
                            <Icon className={styles.trigger} type='bars' />
                        </Popover>
                        :
                        <Icon className={styles.trigger} onClick={toggle} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                }
                <div className={styles.right}>
                    {
                        user.name ?
                            <Dropdown overlay={this.menu}>
                                <span className={`${styles.action} ${styles.account}`}>
                                    <Avatar size="small" className={styles.avatar} src={user.avatar} />
                                    <span className={styles.name}>{user.name}</span>
                                </span>
                            </Dropdown>
                            :
                            <Spin size="small" style={{ marginLeft: 8 }} />
                    }
                </div>
            </div>
        );
    }
}

GlobalHeader.propTypes = {
    user: PropTypes.object,
};

export default GlobalHeader;
