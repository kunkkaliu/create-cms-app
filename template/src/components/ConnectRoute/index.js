/**
 * Created by liudonghui on 2018/3/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function connectRoute(WrappedComponent) {
    class ConnectRoute extends React.Component {
        shouldComponentUpdate(nextProps) {
            return nextProps.location !== this.props.location;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    ConnectRoute.propTypes = {
        location: PropTypes.object,
    };

    return ConnectRoute;
}
