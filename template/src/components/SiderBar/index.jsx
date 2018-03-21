import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';


class SiderBar extends React.PureComponent {
    render() {
        console.log('SiderBar');
        const {
            collapsed,
            isMobile,
        } = this.props;

        return (
            isMobile ? (
                <DrawerMenu
                    parent={null}
                    level={null}
                    iconChild={null}
                    open={!collapsed}
                    onMaskClick={() => { this.props.onCollapse(true); }}
                    width="256px"
                >
                    <SiderMenu {...this.props} collapsed={isMobile ? false : collapsed} />
                </DrawerMenu>
            ) : <SiderMenu {...this.props} />
        );
    }
}

SiderBar.propTypes = {
    collapsed: PropTypes.bool,
    isMobile: PropTypes.bool,
    onCollapse: PropTypes.func,
};

export default SiderBar;
