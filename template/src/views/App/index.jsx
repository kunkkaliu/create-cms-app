import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import styles from './index.less';
import AuthorizedRoute from '../../components/AuthorizedRoute';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import Exception from '../../components/Exception';
import SiderBar from '../../components/SiderBar';
import Dashboard from '../Dashboard';
import mapToProps from './mapping';
import { netApi as api } from '../../network';
import connectRoute from '../../components/ConnectRoute';
import logo from '../../assets/img/logo.svg';

const { Content, Header, Footer } = Layout;
const DashboardWrapper = connectRoute(Dashboard);

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

// @connect(mapToProps.mapStateToProps)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
        };
    }

    componentDidMount() {
        this.props.getMenu();
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    authority = () => api.post('/auth/passtest');

    render() {
        console.log('App');
        const {
            menus,
            location,
            user,
            collapsed,
            updateCollapsed,
        } = this.props;

        const { isMobile } = this.state;

        const siderProps = {
            menus,
            collapsed,
            location,
            logo,
            isMobile,
            onCollapse: updateCollapsed,
        };

        const headerProps = {
            user,
            collapsed,
            onCollapse: updateCollapsed,
            isMobile,
            logout: this.handleLogout,
            logo,
        };

        return (
            <div className={styles.app}>
                <Layout>
                    <SiderBar {...siderProps} />
                    <Layout>
                        <Header style={{ padding: 0 }}>
                            <GlobalHeader {...headerProps} />
                        </Header>
                        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                            <Switch>
                                <AuthorizedRoute
                                    component={DashboardWrapper}
                                    path='/dashboard'
                                    exact
                                    authority={this.authority}
                                    redirectPath='/exception/403'
                                />
                                <Route path='/exception/403' render={() => <Exception type='403' style={{ minHeight: 500, height: '80%' }} />} />
                                <Route path='/exception/500' render={() => <Exception type='500' style={{ minHeight: 500, height: '80%' }} />} />
                                <Redirect exact from='/' to='/dashboard' />
                                <Route render={() => <Exception type='404' style={{ minHeight: 500, height: '80%' }} />} />
                            </Switch>
                        </Content>
                        <Footer>
                            <GlobalFooter />
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    getMenu: PropTypes.func,
    menus: PropTypes.array,
    location: PropTypes.object,
    user: PropTypes.object,
    collapsed: PropTypes.bool,
    updateCollapsed: PropTypes.func,
};

export default connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)(App);
export { App as AppTest };
