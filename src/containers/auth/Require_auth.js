/**
 * 허가되었을 때 그려줄 컴포넌트
 * import RequireAuth from './components/auth/require_auth';
 *  <Route path="resources" component={requireAuth(Resources)}/>
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authentication extends Component {

        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            //버튼이 Sign In 일때...즉, 로그인하지 않은 상태.(false)
            if (!this.props.authenticated) {

                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            console.log(nextProps);
            if (!nextProps.authenticated) {
                console.log('nextProps.authenticated : '+ nextProps.authenticated);
                this.context.router.push('/');
            }
        }

        render() {
            // console.log('Rendering',ComposedComponent);
            console.log(this.props.authenticated);
            console.log(this.context);

            return <ComposedComponent {...this.props}/>
        }
    }

    // store 안의 state 값을 props 로 연결해줍니다.
    const mapStateToProps = (state) => ({
        authenticated: state.auth.authenticated
    });

    return connect(mapStateToProps)(Authentication);
}
