import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Alert } from 'antd';
import mapToProps from './mapping';
import styles from './index.less';

const FormItem = Form.Item;

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
@Form.create()
export default class Login extends React.PureComponent {
    static propTypes = {
        location: PropTypes.object,
        login: PropTypes.func,
        form: PropTypes.object,
        loginStatus: PropTypes.string,
        submitting: PropTypes.bool,
        push: PropTypes.func,
    }

    componentDidMount() {
        const { location: { state } } = this.props;
        const urlParams = new URL(window.location.href);
        state && state.fromUrl && urlParams.searchParams.set('redirect', state.fromUrl);
        window.history.replaceState(null, 'login', urlParams.href);
    }

    componentWillReceiveProps(nextProps) {
        const { loginStatus, push } = nextProps;
        if (loginStatus !== this.props.loginStatus && loginStatus === 'success') {
            const urlParams = new URL(window.location.href);
            const redirect = urlParams.searchParams.get('redirect');
            push(redirect || '/dashboard');
        }
    }

    renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, login } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                login(values);
            }
        });
    }

    render() {
        const { form: { getFieldDecorator }, loginStatus, submitting } = this.props;
        return (
            <div className={styles.login}>
                <Form onSubmit={this.handleSubmit}>
                    {
                        loginStatus === 'error' &&
                        !submitting &&
                        this.renderMessage('账户或密码错误（admin/888888）')
                    }
                    <FormItem>
                        {
                            getFieldDecorator('userName', {
                                rules: [{
                                    required: true, message: 'Please enter username!',
                                }],
                            })(<Input size='large' prefix={<Icon type="user" className={styles.prefixIcon}/>} placeholder='admin' />)
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('passWord', {
                                rules: [{
                                    required: true, message: 'Please enter password!',
                                }],
                            })(<Input size='large' type='password' prefix={<Icon type="lock" className={styles.prefixIcon}/>} placeholder='888888' />)
                        }
                    </FormItem>
                    <FormItem>
                        <Button size="large" loading={submitting} className={styles.submitBtn} type="primary" htmlType="submit" >登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
