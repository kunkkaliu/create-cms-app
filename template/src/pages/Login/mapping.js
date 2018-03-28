/**
 * Created by liudonghui on 2018/3/28.
 */
import { bindActionCreators } from 'redux';
import { login } from 'actions/login';

export default {
    mapStateToProps: state => ({
        submitting: state.login.submitting,
        loginStatus: state.login.loginStatus,
    }),
    mapDispatchToProps: dispatch => ({
        login: bindActionCreators(login, dispatch),
    }),
};
