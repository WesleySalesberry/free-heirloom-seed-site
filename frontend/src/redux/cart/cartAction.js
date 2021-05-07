import {
    ADD_ITEM_CART,
    REMOVE_ITEM_CART, 
    CLEAR_CART
} from '../constants/cartConstants'

import axios from 'axios'

export const addToCart = (slug) => async (dispatch) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/seeds/${slug}/`)

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
}

export const removeItemFromCart = id => async (dispatch) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
}

export const emptyCart = () => async (dispatch) => {
    console.log('clearing state')
    dispatch({
        type: CLEAR_CART
    })
}
