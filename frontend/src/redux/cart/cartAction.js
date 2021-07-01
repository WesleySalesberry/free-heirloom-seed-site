import {
    ADD_ITEM_CART,
    REMOVE_ITEM_CART, 
    CLEAR_CART
} from '../constants/cartConstants'

import api from '../../utils/api'

export const addToCart = (slug) => async (dispatch, getState) => {

    const data = await api.addItemToCart(slug)

    dispatch({
        type: ADD_ITEM_CART,
        payload: {
            id: data.id,
            name: data.name,
            image: data.image,
            slug: data.slug,
            price: data.price,
            seedID: data.seedID,
            quantity: 1
        }
    })

    sessionStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = id => async (dispatch, getState) => {
    
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
    sessionStorage.removeItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const emptyCart = () => async (dispatch) => {
    sessionStorage.removeItem('cartItems')

    dispatch({
        type: CLEAR_CART
    })
}
