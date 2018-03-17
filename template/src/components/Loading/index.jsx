import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

/* eslint-disable global-require */
const Loading = ({ loading }) => {
    console.log('loading');
    const display = loading ? 'loading-show' : 'loading-hide';
    return (
        <div className={`loading-wrap ${display}`}>
            <div className="loading">
                <img src={require('../../assets/img/loading_circle.gif')} alt=""/>
                <span>玩命加载中...</span>
            </div>
        </div>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default Loading;
/* eslint-enable global-require */
