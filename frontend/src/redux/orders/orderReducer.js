import {
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL,
    ORDER_LIST_CLEAR
} from '../constants/orderConstants'

export const orderListReducer = (state={ orders: [] }, action) => {
    const { type, payload } = action

    switch(type){
        case ORDER_LIST_REQUEST:
            return {
                loading: true,
                order: []
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: payload
            }

        case ORDER_LIST_CLEAR:
            return {
                ...state,
                orders: []
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }

        default: 
            return state
    }
}