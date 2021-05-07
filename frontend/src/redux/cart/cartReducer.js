import {
    ADD_ITEM_CART,
    REMOVE_ITEM_CART,
    CLEAR_CART 
} from '../constants/cartConstants'

export const cartReducer = (state={cartItems: []}, action) => {
    const { type, payload } = action

    switch(type){
        case ADD_ITEM_CART:
            const item = payload
            // const existingItem = state.cartItems.find(it => it.seed === payload.seed)
            const existingItem = state.cartItems.find(it => it.id === item.id)

            if(existingItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(it => it.id === existingItem.id ? item : it)
                }
            }else{
                return {
                    ...state,
                    cartItems: [ ...state.cartItems, item ]
                }
            } 
        
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(it => it.id !== payload)
            }
        
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state

    }
}