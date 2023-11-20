import React from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { apiLogin } from "../../apis";
import { setLocalToken, setLocalRefreshToken, setProfile } from "../../apis/storage";
const Login = () => {
    const handleLogin = (values) => {
        console.log(values);
        apiLogin(values).then(({data}) => {
            setLocalRefreshToken(data.tokens.refresh.token);
            setLocalToken(data.tokens.access.token);
            setProfile(data.user);
            setTimeout(() => {
                location.reload();
            }, 500);
        }).catch((e) => {
            message.error(e);
        })
    };
    return (
        <div className="login-page">
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
    
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{ width: '100px' }} type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
};
export default Login;
