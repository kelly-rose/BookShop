import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button} from 'react-bootstrap';
import {handleToken} from '../actions/billing';
import {emptyCart} from '../actions/cart';

class Payments extends Component {
    render() {
        // 토큰, 타이틀, 개수, 가격, 토탈 개수, 토탈 가격

        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={parseInt(this.props.totalAmount)*100}
                 token={token=>
                     // console.log(token)
                     this.props.handleToken(token,this.props.addrInfo,this.props.totalAmount,this.props.cart).then(()=>{
                     this.props.emptyCart();
                     })
                 }
                stripeKey ={'pk_test_3yUnYvdPRvYaKAKg3RvoLCbg'}
            >
                <Button>Go to Payment</Button>
            </StripeCheckout>
        );
    }
}

function mapStateToProps(state) {
    return {
        totalAmount: state.cart.totalAmount,
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        emptyCart:emptyCart,
        handleToken:handleToken
    }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Payments);