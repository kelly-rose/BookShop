import React, { Component } from 'react'
import { connect } from 'react-redux'
import {SignupForm} from '../../components'
import { Redirect } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {authError, signupUser} from '../../actions/auth';

class Signup extends Component {

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authError(null)
        }
    }

    handleSubmit({email, password, passwordConfirmation}) {
        this.props.signupUser({email, password, passwordConfirmation})
    }

      render() {
        return (this.props.authenticated) ?
            <Redirect to="/"/>
            :
            <div>
                <SignupForm onSubmit={this.handleSubmit.bind(this)} errorMessage={this.props.errorMessage}/>
            </div>
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        authError,
        signupUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)