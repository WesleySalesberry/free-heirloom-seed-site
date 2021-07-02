import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { seedListReducer, seedDetailReducer } from './seeds/seedReducer'
import { cartReducer } from './cart/cartReducer'
import { authReducer } from './auth/authReducer'
import { addressReducer } from './shipping/shippingReducer'

const reducer = combineReducers({
    seedLists: seedListReducer,
    seedDetails: seedDetailReducer,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
})

const userStroage = JSON.parse(sessionStorage.getItem('user'))
const addressStroage = JSON.parse(sessionStorage.getItem('address'))
const cartStroage = sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : []

const initalState = {
    // cart: { cartItems: cartStroage },
    auth: { user: userStroage }, 
    address: { address: addressStroage },
    cart: { cartItems: cartStroage }
    
}

const middleware = [ thunk ]

const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store