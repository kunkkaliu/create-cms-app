import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { history } from '../store/configureStore';
import AuthorizedRoute from 'components/AuthorizedRoute';
import Login from 'pages/Login';
import BasicLayout from 'layouts/BasicLayout';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object,
    }

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <AuthorizedRoute
                            component={BasicLayout}
                            path='/'
                            authority={this.authority}
                            redirectPath='/login'
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}
