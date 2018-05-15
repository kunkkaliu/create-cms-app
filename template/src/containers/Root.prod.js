import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import { history } from '../store/configureStore';
import AuthorizedRoute from 'components/Authorized/AuthorizedRoute';
import Login from 'pages/Login';
import BasicLayout from 'layouts/BasicLayout';
import { getMenu } from 'actions/menu';


export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.authority = props.store.dispatch(getMenu()).payload.promise;
    }

    static propTypes = {
        store: PropTypes.object,
    }

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <LocaleProvider locale={zhCN}>
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
                </LocaleProvider>
            </Provider>
        );
    }
}
