//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {AddressField,addressFormFields} from './../components';
import {LinkContainer} from 'react-router-bootstrap';
// import validateEmails from '../../utils/validateEmails';
import {Table, Panel, Grid, Well, Col, Row, Button, ButtonGroup, Label} from 'react-bootstrap';
import {connect} from 'react-redux';

const required = value => (value ? undefined : 'Required');

class AddressForm extends Component {

    renderCart() {
        return this.props.cart.map(cartArr => {
            return (
                <tr key={cartArr._id}>
                    <td>{cartArr.title}</td>
                    <td>{cartArr.price}</td>
                    <td>{cartArr.quantity}</td>
                </tr>
            );
        });
    }
    renderFields() {
        return _.map(addressFormFields, ({label, name}) => {
            return (
                <Field
                    key={name}
                    component={AddressField}
                    type="text"
                    label={label}
                    name={name}
                    validate={required}
                />
            );
        });
    }

    render() {
        return (
            <Grid>
                <Well>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Panel header="Address" bsStyle="primary">
                                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                                    {this.renderFields()}
                                    <LinkContainer to="/cart">
                                        <Button bsStyle="danger">CANCEL</Button>
                                    </LinkContainer>
                                    <Button type="submit" bsStyle="primary">Next</Button>
                                </form>
                            </Panel>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Panel header="Order Summary" footer={"Total : $ "+this.props.totalAmount}>
                                <Table fill responsive>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>USD</th>
                                        <th>Qty</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCart()}
                                    </tbody>
                                </Table>
                            </Panel>
                        </Col>
                    </Row>
                </Well>
            </Grid>
        );
    }
}

//section 11 - 153
function validate(values) {
    const errors = {};

    // errors.recipients = validateEmails(values.recipients || '');    //section 11 - 156

    _.each(addressFormFields, ({name}) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

AddressForm = connect(mapStateToProps, null)(AddressForm);

export default reduxForm({
    // validate : validate,
    form: 'surveyForm'
    , destroyOnUnmount: false
})(AddressForm);