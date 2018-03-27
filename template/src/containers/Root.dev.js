import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthorizedRoute from 'components/AuthorizedRoute';
import Login from 'components/Login';
import BasicLayout from 'layouts/BasicLayout';
import DevTools from './DevTools';

class Root extends React.Component {
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
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object,
};

export default Root;
