import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

class Exception extends React.PureComponent {
    render() {
        console.log('exception');
        const {
            type,
            title,
            desc,
            img,
            actions,
            ...rest
        } = this.props;

        const pageType = type in config ? type : '404';
        return (
            <div className={styles.exception} {...rest}>
                <div className={styles.imgBlock}>
                    <div
                        className={styles.imgEle}
                        style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                    />
                </div>
                <div className={styles.content}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={styles.desc}>{desc || config[pageType].desc}</div>
                    <div className={styles.actions}>
                        {
                            actions || <Link to='/'><Button type="primary">返回首页</Button></Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Exception.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    img: PropTypes.string,
    actions: PropTypes.node,
};

export default Exception;
