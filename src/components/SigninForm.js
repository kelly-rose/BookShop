import React from 'react'
import {
    Well,
    Panel,
    Button,
    Grid
} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form'
import {FormHelper} from '.'
import {Link} from 'react-router-dom';

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

const required = value => (value ? undefined : 'Required');

const SigninForm = props=> {

    const {handleSubmit,errorMessage} = props;

    return (
        <Grid>
            <Well>
                <Panel>
                    <form onSubmit={handleSubmit}>
                        <Field
                            label="Email"
                            name="email"
                            component={FormHelper}
                            validate={[email,required]}
                            type="text"/>

                        <Field
                            label="Password"
                            name="password"
                            component={FormHelper}
                            validate={required}
                            type="password"/>
                        {(errorMessage) && (<div className="alert alert-danger">
                            <strong>Oops: </strong>{errorMessage}
                        </div>)}
                        <Button type="submit" bsStyle="primary">Sign In</Button>
                        <a href="/auth/google">Google</a>
                        <span> New Here? </span><Link to="/signup">Sign Up</Link>
                    </form>
                </Panel>
            </Well>
        </Grid>
    )

}

export default reduxForm({
    form: 'signin'
})(SigninForm)
