import React from 'react';
import {
    Breadcrumb, BreadcrumbItem,

    Button, Form, FormGroup, Label, Input, Col
} from 'reactstrap';



const Signupp = () => {
    return (
        <Form action="action_page.php" method="post">




            <div className="controller">
                <Label for="username"><b>Username: </b></Label>
                <Input type="text" id="firstname" name="firstname"
                    placeholder="Enter Username" />

                <br></br>
                <br></br>

                <Label for="Email"><b>Email: </b></Label>
                <Input type="text" id="Email" name="Email"
                    placeholder="Enter Email" />

                <br></br>
                <br></br>
               

                <Label for="username"><b>Password: </b></Label>
                <Input type="text" id="firstname" name="firstname"
                    placeholder="Enter Password" />

                <br></br>
                <br></br>
                
                <button type="submit">SignUpp</button>



            </div>
        </Form>
    );
}

export default Signupp;