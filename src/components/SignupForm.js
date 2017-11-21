import React from 'react'
import {
    Well,
    Panel,
    Button,
    Grid
} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form'
import {FormHelper} from '.'

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
const required = value => (value ? undefined : 'Required')

const SignupForm = props=> {

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

                        <Field
                            label="Password Confirmation"
                            name="passwordConfirmation"
                            component={FormHelper}
                            validate={required}
                            type="password"/>
                        {(errorMessage) && (<div className="alert alert-danger">
                            <strong>Oops: </strong>{errorMessage}
                        </div>)}
                        <Button type="submit" bsStyle="primary">Sign Up</Button>
                    </form>
                </Panel>
            </Well>
        </Grid>
    )

}

const validate = values => {
    const errors = {}

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must match'
    }

    return errors
}


export default reduxForm({
    form: 'signup',
    validate
})(SignupForm)
