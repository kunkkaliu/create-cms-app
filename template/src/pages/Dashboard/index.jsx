import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapToProps from './mapping';
import styles from './index.less';

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Dashboard extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string,
        changeName: PropTypes.func,
        submit: PropTypes.func,
        userInfo: PropTypes.object,
    }
    handleSubmit = () => {
        this.props.submit(this.props.name);
    }
    handleChange = (e) => {
        this.props.changeName(e.target.value);
    }
    render() {
        console.log('Dashboard');
        const { name, userInfo } = this.props;
        return (
            <div className={styles.dashboard}>
                <h1>hello world!</h1>
                <form>
                    <div>
                        <input type="text" placeholder="Input Your Name" onChange={this.handleChange}/>
                    </div>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
                <div>Name: <strong className={styles.name}>{name}</strong></div>
                <div>NickName: <strong className={styles.nickname}>{userInfo && userInfo.nickname}</strong></div>
            </div>
        );
    }
}
