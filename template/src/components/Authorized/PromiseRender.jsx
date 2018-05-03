import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {
    constructor(props) {
        super(props);
        this.unmount = false;
        this.state = {
            auth: false,
            hasAuthed: false,
        };
    }

    static propTypes = {
        promise: PropTypes.object,
        ok: PropTypes.object,
        error: PropTypes.object,
    }

    componentDidMount() {
        this.setRenderComponent();
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    // set render Component : ok or error
    setRenderComponent() {
        this.props.promise.then((res) => {
            let data = res && res.data;
            if (res && res.payload) {
                ({ data } = { ...res.payload });
            }
            if (data && data.code === 0) {
                !this.unmount &&
                this.setState({
                    auth: true,
                    hasAuthed: true,
                });
            } else {
                !this.unmount &&
                this.setState({
                    auth: false,
                    hasAuthed: true,
                });
            }
        }).catch(() => {
            !this.unmount &&
            this.setState({
                auth: false,
                hasAuthed: true,
            });
        });
    }

    // Determine whether the incoming component has been instantiated
    // checkIsInstantiation = (target) => {
    //     if (!React.isValidElement(target)) {
    //         return target;
    //     }
    //     return () => target;
    // };

    render() {
        console.log('promise render');

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
            ok,
            error,
        } = this.props;
        if (auth) {
            return ok;
        }
        return error;
    }
}
