import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../views/App';
import Login from '../views/Login';
import DevTools from './DevTools';

class Root extends React.Component {
    render() {
        const { store } = this.props;
        console.log('root container');
        return (
            <Provider store={ store }>
                <div>
                    <Router>
                        <Switch>
                            <Route path='/login' component={Login} />
                            <Route path='/' component={App} />
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
