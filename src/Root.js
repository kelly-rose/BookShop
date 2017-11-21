/**
 * Created by siri on 2017-07-01.
 */
//, 여기서 Provider 를 통하여 프로젝트에 리덕스를 연결시킬거다.
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import routes from './shared/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';
import {createLogger} from 'redux-logger';

import axios from 'axios';

const logger = createLogger();

const middleware =applyMiddleware(reduxThunk, logger);
// WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

const token = localStorage.getItem('token');

if (token) {
    //we need to update application state
    store.dispatch({type: AUTH_USER});
}


axios.get('/api/cart')
    .then(function (response) {
        console.log('cartcartcart');
        store.dispatch({
            type: "GET_CART",
            payload: response.data
        })
    })
    .catch(function (err) {
        store.dispatch({
            type: "GET_CART_REJECTED",
            msg: "error when getting the cart from session"
        })
    })


const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </Provider>
);

export default Root;