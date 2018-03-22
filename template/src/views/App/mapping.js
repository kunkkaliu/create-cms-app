/**
 * Created by liudonghui on 17/9/13.
 */
import { bindActionCreators } from 'redux';
import { getMenu, updateCollapsed } from '../../actions/menu';

export default {
    mapStateToProps: state => ({
        menus: state.menu.menus,
        user: state.menu.user,
        collapsed: state.menu.collapsed,
    }),
    mapDispatchToProps: dispatch => ({
        getMenu: bindActionCreators(getMenu, dispatch),
        updateCollapsed: bindActionCreators(updateCollapsed, dispatch),
    }),
};

