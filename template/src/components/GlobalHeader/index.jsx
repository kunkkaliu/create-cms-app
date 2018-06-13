import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Spin, Divider, Avatar } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'react-router-dom';
import avatar from 'assets/img/avatar.jpeg';
import styles from './index.less';

const spinStyle = {
    marginLeft: 8,
};
const triggerMethod = ['hover', 'click'];

export default class GlobalHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.menu = (
            <Menu className={styles.menu} onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
    }

    static propTypes = {
        user: PropTypes.object,
        handleLogout: PropTypes.func,
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
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
        } else if (document.createEventObject) {
            const event = document.createEventObject();
            window.fireEvent('onresize', event);
        }
    }

    handleMenuClick = (e) => {
        const { handleLogout } = this.props;
        if (e && e.key && e.key === '1') {
            handleLogout && handleLogout();
        }
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
                                    <img src={logo} alt="logo" width="32" />
                                </Link>
                            ),
                            <Divider type="vertical" key="line" />,
                        ]) : null
                }
                <Icon className={styles.trigger} onClick={this.toggle} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                <div className={styles.right}>
                    {
                        user.fullname ?
                            <Dropdown overlay={this.menu} trigger={triggerMethod}>
                                <span className={`${styles.action} ${styles.account}`}>
                                    <Avatar size="small" className={styles.avatar} src={user.avatar || avatar} />
                                    <span className={styles.name}>{user.fullname}</span>
                                </span>
                            </Dropdown>
                            :
                            <Spin size="small" style={spinStyle} />
                    }
                </div>
            </div>
        );
    }
}
