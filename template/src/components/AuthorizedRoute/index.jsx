import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { Route, Redirect } from 'react-router-dom';

class AuthorizedRoute extends React.PureComponent {
    constructor(props) {
        super(props);
        this.unmount = false;
        this.state = {
            auth: false,
            hasAuthed: false,
        };
    }

    componentDidMount() {
        this.getAuth();
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    getAuth = () => {
        this.props.authority().then((res) => {
            if (res && res.data && res.data.code == 0) {
                !this.unmount &&
                this.setState({
                    auth: true,
                    hasAuthed: true,
                });
            } else {
                !this.unmount &&
                this.setState({
                    auth: true,
                    hasAuthed: true,
                });
            }
        }).catch((err) => {
            !this.unmount &&
            this.setState({
                auth: true,
                hasAuthed: true,
            });
        });
    }

    render() {
        console.log('authorized route');
        const { auth, hasAuthed } = this.state;
        if (!hasAuthed) {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        margin: 'auto',
                        paddingTop: 50,
                        textAlign: 'center',
                    }}
                >
                    <Spin size="large"/>
                </div>
            );
        }
        const {
            component: Component,
            redirectPath,
            ...rest
        } = this.props;
        return (
            <Route {...rest} render={props => (
                auth ? <Component {...props} /> : <Redirect to={{ pathname: redirectPath }} />
            )}/>
        );
    }
}

AuthorizedRoute.propTypes = {
    authority: PropTypes.func.isRequired,
    component: PropTypes.func,
    redirectPath: PropTypes.string,
};

export default AuthorizedRoute;
