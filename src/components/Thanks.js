/**
 * Created by siri on 2017-07-01.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Button, Well} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {billingInit} from '../actions/billing';

class Thanks extends React.Component{
    componentDidMount(){
        this.props.billingInit();
    }

    render(){
        return(
            <Grid>
                <Well>
                    <Jumbotron>
                        <h1>Thank you for your order!</h1>
                        <p>Your order is completed. You can see this billing on your email you wrote with card
                            information. </p>
                        <p>Also, you can check your <Link to="/invoice">invoice page.</Link></p>
                        <p>
                            <LinkContainer to="/">
                                <Button bsStyle="primary">Go Main</Button>
                            </LinkContainer>
                        </p>
                    </Jumbotron>
                </Well>
            </Grid>

        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        billingInit:billingInit
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(Thanks);
