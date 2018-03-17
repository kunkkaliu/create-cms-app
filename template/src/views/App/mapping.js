/**
 * Created by liudonghui on 17/9/13.
 */
import { bindActionCreators } from 'redux';
import { getMenu, updateOpenKeys } from '../../actions/menu';

export default {
    mapStateToProps: state => ({
        menus: state.menu.menus,
        openKeys: state.menu.openKeys,
        user: state.menu.user,
    }),
    mapDispatchToProps: dispatch => ({
        getMenu: bindActionCreators(getMenu, dispatch),
        updateOpenKeys: bindActionCreators(updateOpenKeys, dispatch),
    }),
};

