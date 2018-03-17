/**
 * Created by liudonghui on 17/9/13.
 */
import { bindActionCreators } from 'redux';
import { changeName, submit } from '../../actions/dashboard';

export default {
    mapStateToProps: state => ({
        name: state.dashboard.name,
        userInfo: state.dashboard.userInfo || {},
    }),
    mapDispatchToProps: dispatch => ({
        changeName: bindActionCreators(changeName, dispatch),
        submit: bindActionCreators(submit, dispatch),
    }),
};
