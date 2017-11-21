import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/invoice';
import {Panel,ListGroup,ListGroupItem,Grid,Well,Row,Col,Media,Label} from 'react-bootstrap';
const test=(_id,totalAmount,date)=>(<Row>
    <Col xs={12} sm={1}></Col>
    <Col xs={12} sm={4}>
        <h6>Order Date :</h6>
        <p>{date}</p>
    </Col>
    <Col xs={12} sm={5}>
        <h6>Order Number :</h6>
        <p>{_id}</p>
    </Col>
    <Col xs={12} sm={2}>
        <h6>Order Total :</h6>
        <p>$ {totalAmount}</p>
    </Col>
</Row>)

class Invoice extends Component {

    componentDidMount(){
        this.props.invoiceList();
    }

    renderList(){
        return this.props.invoices.map((invoice) => {
            return (
                <Panel key={invoice._id} collapsible header={test(invoice._id,invoice.totalAmount,invoice.purchaseDate)} >
                    {invoice.product.map((prod) => {
                        return (
                        <ListGroup key={prod._id} fill>
                        <ListGroupItem>
                            <Row>
                                <Col xs={12} sm={1}></Col>
                                <Col xs={12} sm={6}>
                                    <Media>
                                        <Media.Left>
                                            <img width={64} height={64} src={prod.image} alt="Image"/>
                                        </Media.Left>
                                        <Media.Body>
                                            <h6>{prod.title}</h6>
                                        </Media.Body>
                                    </Media>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <h6>usd. {prod.price}</h6>
                                </Col>
                                <Col xs={12} sm={2}>
                                    <h6>qty. <Label bsStyle="success">{prod.quantity}</Label></h6>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                        );
                    })
                    }
                </Panel>
            );
        });
    }
    render() {
        return (
            <Grid>
                <Well>
                {this.renderList()}
                    </Well>
            </Grid>
                );
    }
}

function mapStateToProps(state) {
    return {
        invoices:state.invoice.data,
        products:state.invoice.data.product
    }
}

export default connect(mapStateToProps,actions)(Invoice);