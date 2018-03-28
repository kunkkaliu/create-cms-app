import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { history } from '../store/configureStore';
import AuthorizedRoute from 'components/AuthorizedRoute';
import Login from 'pages/Login';
import BasicLayout from 'layouts/BasicLayout';
import DevTools from './DevTools';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object,
    }

    authority = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    code: 0,
                },
            });
        }, 2000);
    });

    render() {
        const { store } = this.props;
        console.log('root container');
        return (
            <Provider store={ store }>
                <div>
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
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
