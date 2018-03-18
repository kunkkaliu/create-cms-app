import React from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {
    unmount = false;
    state = {
        component: null,
    };

    componentDidMount() {
        this.setRenderComponent(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // new Props enter
        // this.setRenderComponent(nextProps);
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    // set render Component : ok or error
    setRenderComponent(props) {
        const ok = this.checkIsInstantiation(props.ok);
        const error = this.checkIsInstantiation(props.error);
        props.promise
            .then(() => {
                !this.unmount &&
                this.setState({
                    component: ok,
                });
            })
            .catch(() => {
                !this.unmount &&
                this.setState({
                    component: error,
                });
            });
    }

    // Determine whether the incoming component has been instantiated
    checkIsInstantiation = (target) => {
        if (!React.isValidElement(target)) {
            return target;
        }
        return () => target;
    };

    render() {
        console.log('promise render');
        const Component = this.state.component;
        return Component ?
            (
                <Component />
            ) : (
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
}
