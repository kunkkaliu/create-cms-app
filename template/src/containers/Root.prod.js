import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthorizedRoute from 'components/AuthorizedRoute';
import Login from 'components/Login';
import BasicLayout from 'layouts/BasicLayout';

class Root extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <AuthorizedRoute
                            component={BasicLayout}
                            path='/'
                            authority={this.authority}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object,
};

export default Root;
