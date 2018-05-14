import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Raven from 'raven-js';
import store from './store';
import './index.less';
import Root from './containers/Root';
import FastClick from 'fastclick';
import globalConfig from './globalConfig';

// 监控
try {
    // 非开发模式下配置和初始化Sentry监控
    if (process.env.NODE_ENV !== 'development') {
        Raven.config(globalConfig.ravenHost, {
            'release': CODE_VERSION,
        }).install();
    }
} catch (e) {
    console.log('配置和初始化Sentry监控错误');
}

render(
    <AppContainer>
        <Root
            store={ store }
        />
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}

FastClick.attach(document.body);
