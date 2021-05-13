import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { seedListReducer, seedDetailReducer } from './seeds/seedReducer'
import { cartReducer } from './cart/cartReducer'
import { authReducer } from './auth/authReducer'

const reducer = combineReducers({
    seedLists: seedListReducer,
    seedDetails: seedDetailReducer,
    cart: cartReducer,
    auth: authReducer
})

const userInfoStroage = sessionStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : []

const initalState = {
    userLoginData: { userInfo: userInfoStroage }
}

const middleware = [ thunk ]

const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store