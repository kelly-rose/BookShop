//This is actionCreator
import axios from 'axios';      //promise를 반환한다.
import {
    INVOICE_LIST_FAILURE,
    INVOICE_LIST_SUCCESS,
    INVOICE_LIST_INIT
} from './types';

// const ROOT_URL = 'http://localhost:3001';

/* BOOK LIST */
export function invoiceList() {
    return (dispatch) => {
        return axios.get('/api/invoice',{
            headers: {authorization: localStorage.getItem('token')}
        })
            .then((res) => {
                // console.log(res.data);
                dispatch({type: INVOICE_LIST_SUCCESS, payload: res.data});
            }).catch((error) => {
                //This code must be fixed...
                dispatch({
                    type: INVOICE_LIST_FAILURE,
                    // payload: error.res.data.code
                });
            });
    };
}


export function invoiceReset() {
    return function (dispatch) {
        dispatch({type:INVOICE_LIST_INIT});
    }
}