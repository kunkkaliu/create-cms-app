import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Spin, Divider, Avatar } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'react-router-dom';
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

    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    toggle = () => {
        const { toggle } = this.props;
        toggle();
        this.triggerResizeEvent();
    }

    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
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
            collapsed,
            isMobile,
            logo,
        } = this.props;

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
                <Icon className={styles.trigger} onClick={this.toggle} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
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
    logout: PropTypes.func,
    collapsed: PropTypes.bool,
    isMobile: PropTypes.bool,
    toggle: PropTypes.func,
    logo: PropTypes.string,
};

export default GlobalHeader;
