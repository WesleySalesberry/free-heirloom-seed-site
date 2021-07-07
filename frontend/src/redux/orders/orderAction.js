import {
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL,
} from '../constants/orderConstants'

import { CLEAR_CART } from '../constants/cartConstants'

import api from '../../utils/api'

export const getOrders = () => async dispatch => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })

        const orders = await api.getOrders()
        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: orders
        })

        dispatch({
            type: CLEAR_CART
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error
        })
    }
}