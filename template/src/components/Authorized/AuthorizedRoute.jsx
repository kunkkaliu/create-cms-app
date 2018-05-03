import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import checkPermissions from './checkPermissions';

class AuthorizedRoute extends React.Component {
    static propTypes = {
        render: PropTypes.func,
        redirectPath: PropTypes.string,
        component: PropTypes.func,
        permission: PropTypes.bool,
        currentAuthority: PropTypes.string,
        authority: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func,
            PropTypes.string,
            PropTypes.bool,
            PropTypes.object,
        ]),
    }

    render() {
        console.log('authorized route');
        const {
            component: Component,
            render,
            authority,
            currentAuthority,
            redirectPath,
            ...rest
        } = this.props;
        const noPass = <Route {...rest} render={() => (redirectPath ? <Redirect to={{ pathname: redirectPath }} /> : null)} />;
        const pass = <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />;
        return (
            checkPermissions(authority, currentAuthority, pass, noPass)
        );
    }
}

export default AuthorizedRoute;
