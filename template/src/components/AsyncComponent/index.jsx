import React from 'react';
import connectRoute from 'components/ConnectRoute';

export default function asyncComponent(importComponent, needConnectRoute) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.unmount = false;
            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
            !this.unmount && this.setState({
                component: needConnectRoute ? connectRoute(component) : component,
            });
        }

        componentWillUnmount() {
            this.unmount = true;
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    };
}
