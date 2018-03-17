import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import CheckPermissions from './CheckPermissions';

class AuthorizedRoute extends React.PureComponent {
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
        const noPass = <Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />;
        const pass = <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />;
        return (
            CheckPermissions(authority, currentAuthority, pass, noPass)
        );
    }
}

AuthorizedRoute.propTypes = {
    render: PropTypes.func,
    redirectPath: PropTypes.string,
};

export default AuthorizedRoute;
