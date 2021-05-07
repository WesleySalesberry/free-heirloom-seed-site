import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { seedListReducer, seedDetailReducer } from './seeds/seedReducer'
import { cartReducer } from './cart/cartReducer'

const reducer = combineReducers({
    seedLists: seedListReducer,
    seedDetails: seedDetailReducer,
    cart: cartReducer
})

const initalState = {}

const middleware = [ thunk ]

const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store