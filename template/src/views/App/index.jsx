import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import styles from './index.less';
import AuthorizedRoute from '../../components/AuthorizedRoute';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import Exception from '../../components/Exception';
import Sidebar from '../../components/Sidebar';
import Dashboard from '../Dashboard';
import mapToProps from './mapping';
import { netApi as api } from '../../network';
import connectRoute from '../../components/ConnectRoute';
import logo from '../../assets/img/logo.svg';

const { Content, Header, Footer } = Layout;
const DashboardWrapper = connectRoute(Dashboard);

// @connect(mapToProps.mapStateToProps)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isMobile: document.body.clientWidth < 769,
            menuPopoverVisible: false,
        };
        this.resizeTid = null;
    }

    componentDidMount() {
        this.props.getMenu();
        let tid;
        window.onresize = () => {
            clearTimeout(tid);
            tid = setTimeout(() => {
                const isMobile = document.body.clientWidth < 769;
                if (isMobile != this.state.isMobile) {
                    this.setState({
                        isMobile: isMobile,
                    });
                }
            }, 300);
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (this.resizeTid) {
            clearTimeout(this.resizeTid);
            this.resizeTid = null;
        }
        this.resizeTid = setTimeout(() => {
            if (document.createEvent) {
                let event = document.createEvent('HTMLEvents');
                event.initEvent('resize');
                window.dispatchEvent(event);
            } else if (document.createEventObject) {
                window.fireEvent('onresize');
            }
        }, 600);
    }

    switchMenuPopover = (e) => {
        this.setState({
            menuPopoverVisible: e,
        });
    }

    authority = () => api.post('/auth/passtest');

    render() {
        console.log('App');
        const {
            menus,
            openKeys,
            updateOpenKeys,
            location,
            user,
        } = this.props;

        const { collapsed, isMobile, menuPopoverVisible } = this.state;

        const siderProps = {
            menus,
            openKeys,
            collapsed,
            updateOpenKeys,
            location,
            logo,
        };

        const headerProps = {
            menus,
            user,
            openKeys,
            collapsed,
            toggle: this.toggle,
            updateOpenKeys,
            isMobile,
            menuPopoverVisible,
            switchMenuPopover: this.switchMenuPopover,
            logout: this.handleLogout,
            location,
            logo,
        };

        return (
            <div className={styles.app}>
                <Layout>
                    <Sidebar {...siderProps} />
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
    openKeys: PropTypes.array,
    updateOpenKeys: PropTypes.func,
    location: PropTypes.object,
    user: PropTypes.object,
};

export default connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)(App);
export { App as AppTest };
