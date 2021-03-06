import React from 'react';
import {connect} from 'react-redux';
import { Modal,Media,Panel,Grid, Col, Row, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../actions/cart';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

class Cart extends React.Component{
    constructor(){
        super();
        this.state = {
            showModal:false
        }
    }
    open(){
        this.setState({showModal:true})
    }
    close(){
        this.setState({showModal:false})
    }
    componentDidMount(){
        this.props.getCart();
    }
    onDelete(_id){
        // Create a copy of the current array of books
        const currentBookToDelete = this.props.cart;
        // Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(cart){
                return cart._id === _id;
            }
        )
        //use slice to remove the book at the specified index
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
    }
    onIncrement(_id){
        this.props.updateCart(_id, 1, this.props.cart);
    }
    onDecrement(_id, quantity){
        if(quantity > 1){
            this.props.updateCart(_id, -1, this.props.cart);
        }
    }

    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return(<div></div>)
    }

    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){
            return(
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={1}></Col>
                        <Col xs={12} sm={4}>
                            <Media>
                                <Media.Left>
                                    <img width={64} src={cartArr.image}/>
                                </Media.Left>
                                <Media.Body>
                                    <h6>{cartArr.title}</h6>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={3}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this);

        return(
            <Grid>
                <Panel header="Cart" bsStyle="primary" >
                    {cartItemsList}
                    <Row>
                        <Col xs={12} sm={8}></Col>
                        <Col xs={12} sm={4}>
                            <div style={{margin:"0 0 0 30px"}}>
                                <h6>Total amount: {this.props.totalAmount}</h6>

                                {this.props.authenticated ?<LinkContainer to="/address">
                                    <Button bsStyle="success" bsSize="small">
                                        PROCEED TO CHECKOUT
                                    </Button>
                                </LinkContainer> : <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                                    PROCEED TO CHECKOUT
                                </Button>}

                            </div>
                        </Col>
                    </Row>
                    <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={{textAlign:"center"}}>
                        <Modal.Header closeButton>
                            <Modal.Title >Continue Checkout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Do you want to be with us?</h6>
                            <h6>Come on and Join us ! You will get a lot of benefits !</h6>
                            <Link to="/signin">Sign In / Sign Up</Link>
                        </Modal.Body>
                        <Modal.Footer>
                            <LinkContainer to="/address">
                                <Button bsStyle="default" bsSize="small">Keep Going</Button>
                            </LinkContainer>
                        </Modal.Footer>
                    </Modal>
                </Panel>
            </Grid>

        )
    }
}

Cart.propTypes = {
    cart: PropTypes.array
};

Cart.defaultProps = {
    cart:[]
};

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
        authenticated: state.auth.authenticated
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCart:updateCart,
        getCart:getCart
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);