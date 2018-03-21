import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.less';
import { getCurrentMenu, getPathArray } from '../../utils';
import Menus from '../Menus';

const { Sider } = Layout;

class Sidebar extends React.PureComponent {
    updateKeys = (pathname) => {
        const { updateOpenKeys } = this.props;
        const openkeys = [];
        let pathArray = [];
        let current = getCurrentMenu(pathname);
        if (current) {
            pathArray = getPathArray(current);
        }
        pathArray.forEach((item) => {
            if (item.child && item.child.length > 0) {
                openkeys.push(`sub${item.id}`);
            }
        });
        updateOpenKeys(openkeys);
    }

    componentDidMount() {
        const { location } = this.props;
        this.updateKeys(location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location && this.props.location && (nextProps.location.pathname != this.props.location.pathname)) {
            this.updateKeys(nextProps.location.pathname);
        }
    }

    render() {
        console.log('SiderMenu');
        const {
            menus,
            openKeys,
            collapsed,
            updateOpenKeys,
            location,
            logo,
            isMobile,
            onCollapse,
        } = this.props;

        const menusProps = {
            menus,
            openKeys,
            collapsed,
            menuTheme: 'dark',
            updateOpenKeys,
            location,
            isMobile,
            onCollapse,
        };
        return (
            <Sider
                trigger={null}
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                width={256}
                onCollapse={onCollapse}
                className={styles.sider}
            >
                <div className={styles.logo} key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>瓜子后服务</h1>
                    </Link>
                </div>
                <Menus {...menusProps} />
            </Sider>
        );
    }
}

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    updateOpenKeys: PropTypes.func,
    location: PropTypes.object,
    menus: PropTypes.array,
    openKeys: PropTypes.array,
    logo: PropTypes.string,
    isMobile: PropTypes.bool,
    onCollapse: PropTypes.func,
};

export default Sidebar;
