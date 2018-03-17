import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

/**
 * 显示错误信息
 * 可以当404页来用
 */

const Error = ({ errorMsg }) => {
    const msg = errorMsg || '404 Not Found';
    return (
        <div className={styles['not-found']}>
            <h1>{msg}</h1>
        </div>
    );
};

Error.propTypes = {
    errorMsg: PropTypes.string,
    route: PropTypes.object,
};

export default Error;
