//This is actionCreator
import axios from 'axios';      //promise를 반환한다.
import {
    BOOK_LIST,
    BOOK_LIST_FAILURE,
    BOOK_LIST_SUCCESS,
    BOOK_POST,
    BOOK_POST_FAILURE,
    BOOK_POST_SUCCESS,
    BOOK_DELETE_SUCCESS,
    BOOK_DELETE_FAILURE,
    LOAD,
    BOOK_EDIT_FAILURE,
    BOOK_EDIT_SUCCESS
} from './types';

// const ROOT_URL = 'http://localhost:3001';

/* BOOK LIST */
export function bookListRequest() {
    return (dispatch) => {
        // inform BOOK POST API is starting
        dispatch({type: BOOK_LIST});
        return axios.get('/api/book')
            .then((res) => {
                // console.log(res.data);
                dispatch({type: BOOK_LIST_SUCCESS, payload: res.data});
            }).catch((error) => {
                //This code must be fixed...
                dispatch({
                    type: BOOK_LIST_FAILURE,
                    // payload: error.res.data.code
                });
            });
    };
}


/* BOOK POST */
export function bookPostRequest({title, description, price, image}) {
    return (dispatch) => {
        // inform BOOK POST API is starting
        dispatch({type: BOOK_POST});
        return axios.post('/api/book', {title, description, price, image}, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                // console.log(response.data);
                dispatch({type: BOOK_POST_SUCCESS});
            }).catch((error) => {
                //This code must be fixed...
                dispatch({
                    type: BOOK_POST_FAILURE,
                    // payload: error.response.data.code
                });
            });
    };
}

export function deleteBook(id) {
    return function (dispatch) {
        return axios.delete('/api/book/' + id, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                // console.log(response.data);
                dispatch({type: BOOK_DELETE_SUCCESS, payload: id});
            }).catch((error) => {
                //This code must be fixed...
                dispatch({
                    type: BOOK_DELETE_FAILURE
                    // payload: error.response.data.code
                });
            });

    }
}

export function bookEditRequest({id, title, description, price, image}) {
    return function (dispatch) {
        return axios.put('/api/book/' + id, {title, description, price, image}, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                // console.log(response.data);
                dispatch({type: BOOK_EDIT_SUCCESS});
            }).catch((error) => {
                //This code must be fixed...
                dispatch({
                    type: BOOK_EDIT_FAILURE
                    // payload: error.response.data.code
                });
            });

    }
}


export function load(loadData) {
    console.log(loadData);
    return function (dispatch) {
        dispatch({type: LOAD, payload: loadData});
    }
}

