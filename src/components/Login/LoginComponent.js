import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    };
    componentDidMount() {
        document.body.style.backgroundColor = "#464646"
    }


    handleLogin(event) {
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div style={{
                    paddingTop: 350,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'left',
                }}>
                    <div style={{
                        width: 450,
                        margin: 'auto',
                        background: '#ffffff',
                        boxShadow: ' 0 14 80 rgba(34, 35, 58, 0.2)',
                        padding: '40 55 45 55',
                        borderRadius: 15,
                        transition: 'all .3s',
                    }}>
                        <Form onSubmit={this.handleLogin}>
                            <Avatar src="/loginAvatar.jpg" style={{ marginLeft: 200, marginBottom: 40 }} />
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup >
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" >Login</Button>
                        </Form>
                    </div>
                </div>
            </div >
        );
    }
}

export default Login;