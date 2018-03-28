import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Spin, Divider, Avatar } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'react-router-dom';
import styles from './index.less';

export default class GlobalHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.menu = (
            <Menu className={styles.menu}>
                <Menu.Item>
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        this.spinStyle = {
            marginLeft: 8,
        };
        this.logoStyle = {
            verticalAlign: 'middle',
        };
        this.triggerMethod = ['hover', 'click'];
    }

    static propTypes = {
        user: PropTypes.object,
        logout: PropTypes.func,
        collapsed: PropTypes.bool,
        isMobile: PropTypes.bool,
        onCollapse: PropTypes.func,
        logo: PropTypes.string,
    }
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    toggle = () => {
        const { onCollapse, collapsed } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    }

    @Debounce(600)
    triggerResizeEvent() {
        if (document.createEvent) {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize');
            window.dispatchEvent(event);
        } else if (document.createEventObject) {
            window.fireEvent('onresize');
        }
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
                                    <img style={this.logoStyle} src={logo} alt="logo" width="32" />
                                </Link>
                            ),
                            <Divider type="vertical" key="line" />,
                        ]) : null
                }
                <Icon className={styles.trigger} onClick={this.toggle} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                <div className={styles.right}>
                    {
                        user.name ?
                            <Dropdown overlay={this.menu} trigger={this.triggerMethod}>
                                <span className={`${styles.action} ${styles.account}`}>
                                    <Avatar size="small" className={styles.avatar} src={user.avatar} />
                                    <span className={styles.name}>{user.name}</span>
                                </span>
                            </Dropdown>
                            :
                            <Spin size="small" style={this.spinStyle} />
                    }
                </div>
            </div>
        );
    }
}
