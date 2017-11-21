import {
    BIlLING_SUCCESS,BIlLING_INIT
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case BIlLING_SUCCESS:
            return {...state,purchase: true};
        case BIlLING_INIT:
            return {...state,purchase: false};
        default:
            return state;
    }
}
