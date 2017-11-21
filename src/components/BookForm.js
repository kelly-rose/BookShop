import React from 'react';
import {loadPostInit,load} from '../actions/book';
import {Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form'
import {FormHelper} from '.'
import {connect} from 'react-redux';

const required = value => (value ? undefined : 'Required')

const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined

// const BookForm = props => {
//
//     const {handleSubmit, submitSucceeded, reset} = props;
//
//     return (
//         <div>
//             <form>
//                 <Field
//                     label="Title"
//                     name="title"
//                     component={FormHelper}
//                     validate={required}
//                     type="text"
//                 />
//
//                 <Field
//                     label="Description"
//                     name="description"
//                     component={FormHelper}
//                     validate={required}
//                     type="text"
//
//                 />
//
//                 <Field
//                     label="Price"
//                     name="price"
//                     component={FormHelper}
//                     validate={[number, required]}
//                     type="text"
//                 />
//
//                 {submitSucceeded ? <Button onClick={reset} bsStyle="success">Success! Click me!</Button> :
//                     <Button onClick={handleSubmit} bsStyle="primary">Post</Button>
//                 }
//             </form>
//
//         </div>
//     )
// }
//
//
// BookForm.propTypes = {
//     handleSubmit: PropTypes.func,
//     errorMessage: PropTypes.bool
//
// };
//
// BookForm.defaultProps = {
//     handleSubmit: () => console.log('this is test'),
//     errorMessage: false
// };
//
// export default reduxForm({
//     form: 'book',
// })(BookForm)


let BookForm = props => {

    const {handleSubmit,onChange, msg,submitSucceeded} = props;

    return (
        <div>
            <form>
                <Field
                    label="Title"
                    name="title"
                    component={FormHelper}
                    validate={required}
                    type="text"
                />

                <Field
                    label="Description"
                    name="description"
                    component={FormHelper}
                    validate={required}
                    type="text"

                />

                <Field
                    label="Price"
                    name="price"
                    component={FormHelper}
                    validate={[number, required]}
                    type="text"
                />

                {submitSucceeded ? <Button bsStyle="success">Success!</Button> :
                    (<Button onClick={handleSubmit} bsStyle="primary">Post</Button>)
                }

            </form>

        </div>
    )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
BookForm = reduxForm({
    form: 'bookForm' // a unique identifier for this form
    , enableReinitialize: true // this is needed!!

})(BookForm);

// You have to connect() to any reducers that you wish to connect to yourself
BookForm = connect(
    state => ({
        initialValues: state.book.edit //use as reset or init
    }),
    {load:load}
)(BookForm);

export default BookForm
