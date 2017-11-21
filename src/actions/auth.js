//This is actionCreator
import axios from 'axios';      //promise를 반환한다.
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, INVOICE_LIST_INIT} from './types';

export function socialSigninUser() {
    return function (dispatch) {
        // Submit email/password to the server
        axios.get('/api/socialLogin')
            .then(response => {
                localStorage.setItem('token', response.data.token);
                if(!response.data.token){
                    localStorage.removeItem('token');
                    dispatch({type: UNAUTH_USER});
                    return;
                }
                dispatch({type: AUTH_USER});
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
}


export function signinUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`/api/signin`, {email, password})
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch({type: AUTH_USER});
            })
            .catch(() => {
                // If req is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post('/api/signup', {email, password})
            .then(response => {
                localStorage.setItem('token', response.data.token);

                dispatch({type: AUTH_USER});
                // this.props.history.push('/');
            })
            .catch((err) => {
                // If req is bad...
                // - Show an error to the user
                console.log(err);
                console.log(err.response);
                dispatch(authError(err.response.data.error));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    return function (dispatch) {
        axios.get('/api/logout')
            .then(response => {
                //user의 cart리듀서 store도 지워줘야함...
                dispatch({type: UNAUTH_USER});
                localStorage.removeItem('token');
                console.log('logout suc')
            })
            .catch((err) => {
                // If req is bad...
                // - Show an error to the user
                console.log(err);
                console.log(err.response);
                dispatch(authError(err.response.data.error));
            });
    }
}

// export const handleToken = (token)=> async dispatch => {
//     const res = await axios.post('/api/stripe',token);
//     dispatch({type: UNAUTH_USER});
// };


// export function fetchMessage() {
//     return function (dispatch) {
//         axios.get(ROOT_URL, {
//             headers: {authorization: localStorage.getItem('token')}
//         })
//             .then(res => {
//                 dispatch({
//                     type: FETCH_MESSAGE,
//                     payload: res.data.message
//                 });
//             });
//
//     }
// }