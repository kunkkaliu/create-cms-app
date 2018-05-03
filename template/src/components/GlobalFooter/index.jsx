import React from 'react';
import styles from './index.less';

export default class GlobalFooter extends React.PureComponent {
    render() {
        console.log('footer');
        return (
            <div className={styles.footer}>
                xx 版权所有 © 2018 xx.com
            </div>
        );
    }
}
