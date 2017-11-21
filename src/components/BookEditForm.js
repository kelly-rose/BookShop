import React from 'react';
import {reduxForm, Field} from 'redux-form'
import {load} from '../actions/book';
import {FormHelper} from '.'

import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

// const required = value => (value ? undefined : 'Choose Item in select box')
//
// const number = value =>
//     value && isNaN(Number(value)) ? 'Must be a number' : undefined

let InitializeFromStateForm = props => {

    const {handleSubmit, submitSucceeded, onChange, onDelete, msg, errorMsg} = props;

    return (
        <div>
            <form>
                <Field
                    label="Title"
                    name="title"
                    component={FormHelper}
                    type="text"
                />
                {errorMsg ?
                    <div><p style={{color: 'red'}}>Choose Item in select box</p></div> : null}

                <Field
                    label="Description"
                    name="description"
                    component={FormHelper}
                    type="text"
                />
                {errorMsg ?
                    <div><p style={{color: 'red'}}>Choose Item in select box</p></div> : null}

                <Field
                    label="Price"
                    name="price"
                    component={FormHelper}
                    type="text"
                />
                {errorMsg ?
                    <div><p style={{color: 'red'}}>Choose Item in select box</p></div> : null}

                {msg ? <Button onClick={onChange} bsStyle="success">Success!</Button> :
                    (<div><Button style={{margin: '0 10px 0 0'}} onClick={handleSubmit} bsStyle="primary">Edit</Button>
                    <Button bsStyle="danger" onClick={onDelete}>Delete</Button></div>)
                }
            </form>

        </div>
    )
}


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
    form: 'initializeFromState' // a unique identifier for this form
    , enableReinitialize: true // this is needed!!

})(InitializeFromStateForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
    state => ({
        initialValues: state.book.edit // pull initial values from account reducer
    }),
    {load: load} // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm

