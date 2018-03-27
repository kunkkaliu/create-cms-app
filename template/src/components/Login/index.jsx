import React from 'react';
import style from './index.less';

class Login extends React.PureComponent {
    componentDidMount() {
    }
    render() {
        return (
            <p className={style.loadingText}>未登录，跳转登录页面中。。。</p>
        );
    }
}

export default Login;
