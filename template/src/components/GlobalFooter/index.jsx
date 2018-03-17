import React from 'react';
import styles from './index.less';

class GlobalFooter extends React.PureComponent {
    render() {
        console.log('footer');
        return (
            <div className={styles.footer}>
                xx 版权所有 © 2017 xx.com
            </div>
        );
    }
}

export default GlobalFooter;
