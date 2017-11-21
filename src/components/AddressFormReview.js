// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './addressFormFields';
import {withRouter} from 'react-router-dom';    //section 11 - 167
// import * as actions from '../../actions';
import {Payments} from '../containers';
import {Redirect} from 'react-router-dom'

import {Panel, Grid, Col, Row, Button, Well, Table} from 'react-bootstrap';


//submitSurvey : section 11 -163
const AddressFormReview = ({onCancel, formValues, cart, totalAmount,billing}) => {
    const renderCart = cart.map(cartArr => {
        return (
            <tr key={cartArr._id}>
                <td>{cartArr.title}</td>
                <td>{cartArr.price}</td>
                <td>{cartArr.quantity}</td>
            </tr>
        );
    });
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (billing) ?
        <Redirect to="/thanks"/>
        :
        (
        <Grid>
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel header="Please confirm your entries" bsStyle="primary">
                            {reviewFields}
                            <Button bsStyle="warning" onClick={onCancel}>Back</Button>
                            <Payments addrInfo={formValues}/>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel header="Order Summary" footer={"Total : $ " + totalAmount}>
                            <Table fill responsive>
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>USD</th>
                                    <th>Qty</th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderCart}
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        </Grid>
    );
};

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values,
        billing:state.billing.purchase,
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    };    //section 11 - 160
}

export default connect(mapStateToProps)(withRouter(AddressFormReview));
