import React, {Component} from 'react'
import {SigninForm} from '../../components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {authError, signinUser} from '../../actions/auth';


import {Redirect} from 'react-router-dom'

class Signin extends Component {
    // componentDidMount(){
    //     console.log(this.props.location);
    //     console.log(this.props.match);
    //
    // }

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authError(null)
        }
    }

    handleSubmit({email, password}) {
        this.props.signinUser({email, password})
    }

    render() {
        return (this.props.authenticated) ?
            <Redirect to="/"/>
            :
            <div>
                <SigninForm onSubmit={this.handleSubmit.bind(this)}
                            errorMessage={this.props.errorMessage}
                           />
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
        signinUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);