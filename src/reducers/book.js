/**
 * Whether or not the user is currently authenticated.
 */

import {
    BOOK_DELETE_FAILURE, BOOK_DELETE_SUCCESS,
    BOOK_LIST,
    BOOK_LIST_FAILURE,
    BOOK_LIST_SUCCESS,
    BOOK_POST,
    BOOK_POST_FAILURE,
    BOOK_POST_SUCCESS,
    LOAD,
    BOOK_EDIT_SUCCESS,
    BOOK_EDIT_FAILURE
} from '../actions/types';


const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    edit: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case BOOK_LIST:
            return {...state, list: {status:'WAITING',data:[]}};
        case BOOK_LIST_SUCCESS:
            return {...state,list: {status:'SUCCESS',data:[...action.payload]}};
        case BOOK_LIST_FAILURE:
            return {...state, post: {status:'FAILURE'}};
        case BOOK_POST:
            return {...state, post: {status:'WAITING'}};
        case BOOK_POST_SUCCESS:
            return {...state,post: {status:'SUCCESS'}};
        case BOOK_POST_FAILURE:
            return {...state, post: {status:'FAILURE'}};
        case BOOK_EDIT_SUCCESS:
            return {...state,edit: {status:'SUCCESS'}};
        case BOOK_EDIT_FAILURE:
            return {...state, edit: {status:'FAILURE'}};
        case "BOOK_DELETE_SUCCESS":
            // Create a copy of the current array of books
            const currentBookToDelete = [...state.list.data]

            // Determine at which index in books array is the book to be deleted
            const indexToDelete =
                currentBookToDelete.findIndex(
                    function(book){
                        return book._id === action.payload;
                    }
                )
            //use slice to remove the book at the specified index
            return {...state, list: {data:
                [...currentBookToDelete.slice(0,
                    indexToDelete),
                    ...currentBookToDelete.slice(indexToDelete +
                        1)]}}
        case BOOK_DELETE_FAILURE:
            return {...state, post: {status:'FAILURE'}};
        case LOAD:
            return {...state,edit:{ ...action.payload}};
      default:
            return state;
    }
}
