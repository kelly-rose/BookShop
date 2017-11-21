/**
 * Whether or not the user is currently authenticated.
 */

import {
    INVOICE_LIST_FAILURE,
    INVOICE_LIST_SUCCESS,
    INVOICE_LIST_INIT
} from '../actions/types';


const initialState = {
        status: 'INIT',
        data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INVOICE_LIST_INIT:
            return {...state,...{status:'INIT',data:[]}};
        case INVOICE_LIST_SUCCESS:
            return {...state,...{status:'SUCCESS',data:[...action.payload]}};
        case INVOICE_LIST_FAILURE:
            return {...state,...{status:'FAILURE'}};
      default:
            return state;
    }
}
