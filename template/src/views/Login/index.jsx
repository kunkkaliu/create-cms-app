import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class Login extends React.Component {
    handleLogin = () => {
        localStorage.setItem('role', 'admin');
        this.props.history.push('/');
    }

    handleLogout = () => {
        localStorage.removeItem('role');
    }

    componentDidMount() {
    }

    render() {
        console.log('login');
        return (
            <div>
                <Button onClick={this.handleLogin}>Login</Button>
                <Button onClick={this.handleLogout}>Logout</Button>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Login;
