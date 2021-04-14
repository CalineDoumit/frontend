import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
        this.role=this.props.auth.userRole;
        this.handleLogin = this.handleLogin.bind(this);
    };
    componentDidMount() {
        //document.body.style.backgroundColor = "#464646"
    }


    handleLogin(event) {
        this.props.loginUser({ username: this.username.value, password: this.password.value })
 // TODO use .then( (response) => { to handle parrallelism, you can even bypass storing the userRole in redux
        event.preventDefault();
       let uRole = this.props.auth.userRole;
       console.log("-----------------");
       console.log("uRole: " + uRole);
       console.log("-----------------");
       this.setState({
        redirect: true
    })


        if (this.state.redirect) {
            if (uRole=='admin')
                // TODO only modify this code when you are sure that the uRole is correct!
                // or history.push 
                return <Redirect to='/dashboard' />
            else if (uRole=='nurse')
                return <Redirect to='/nursemenu' />
            else
                return
        }


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

export default Login; // TODO connect to login component to the redux store
