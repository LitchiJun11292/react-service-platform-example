import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {Form, Input, Button, Checkbox, Dropdown, Menu, message} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import {setUserLogin, setUserTarget} from "@/store/actionCreators";
import './index.scss';

class Login extends React.Component {

    handleMenuClick = (e) => {
        message.info('已切换到' + e.key);
        this.props.setUserTarget(e.key);
    };

    onFinish = values => {
        this.props.setUserLogin();
        // console.log('Received values of form: ', values);
    };

    render () {
        const {token} = this.props;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="college">
                    高校
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="manage">
                    管理员
                </Menu.Item>
            </Menu>
        );

        if (!token) {
            return (
                <div className="ucenter_login">

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                    >
                        <h6 className="select_target">系统登录
                            <Dropdown overlay={menu} placement="bottomRight">
                                <UserSwitchOutlined/>
                            </Dropdown>
                        </h6>
                        <Form.Item
                            name="mobile"
                            rules={[{required: true, message: 'Please input your Username!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your Password!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="/">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            )
        } else {
            return <Redirect to="/ucenter"/>
        }
    }
}

const mapStateToProps = state => ({
    token: state.users.token
});

const mapDispatchToProps = dispatch => ({
    setUserLogin () {
        dispatch(setUserLogin());
    },
    setUserTarget (val) {
        dispatch(setUserTarget(val));
    }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withRouter,
    withConnect,
)(Login);
