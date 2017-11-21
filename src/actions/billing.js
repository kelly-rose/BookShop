//This is actionCreator
import axios from 'axios';      //promise를 반환한다.
import {BIlLING_SUCCESS,BIlLING_INIT} from './types';
export function handleToken(token,addrInfo, totalAmount, cart) {
    token.cart = cart;
    token.totalAmount = totalAmount;
    token.addrInfo = addrInfo;
    return function (dispatch) {
       return axios.post('/api/billing/stripe', token,{
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(() => {
                dispatch({type: BIlLING_SUCCESS});
            }).catch((error) => {
            //This code must be fixed...
            dispatch({type: BIlLING_INIT});  //use as BIlLING_FAILURE

        });

    }
}

export function billingInit() {
    return function (dispatch) {
        dispatch({type: BIlLING_INIT});
    }
}

//
// export const handleToken = (token,addrInfo, totalAmount, cart)=> async dispatch => {
//     console.log(addrInfo);
//     console.log(totalAmount);
//     console.log(cart);
//     token.cart = cart;
//     token.totalAmount = totalAmount;
//     token.addrInfo = addrInfo;
//
//     try {
//         // const res =
//             await axios.post('/api/billing/stripe', token,{
//                 headers: {authorization: localStorage.getItem('token')}
//             });
//         dispatch({type: BIlLING_SUCCESS});
//         dispatch({type: "EMPTY_CART_ITEM"});
//     }catch(err) {
//         dispatch({type: BIlLING_FAILURE});
//     }
// };

