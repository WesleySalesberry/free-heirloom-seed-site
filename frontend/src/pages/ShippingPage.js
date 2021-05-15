import React, { useState, useEffect } from 'react'

import { FormContainer } from '../components/FormContainer'
import { ShippingComponenet } from '../components/ShippingComponenet'

import { useDispatch, useSelector } from 'react-redux'

import { saveAddress, getAddress } from '../redux/shipping/shippingAction'


export const ShippingPage = ({ history }) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { isLoggedIn } = auth

    const usersAddress = useSelector(state => state.address)
    const { address } = usersAddress

    useEffect(() =>{
        if(!isLoggedIn){
            history.push('/login')
        }

        if(address){
            dispatch(getAddress())
        }
    },[dispatch, isLoggedIn])

    return (
        <FormContainer>
            <ShippingComponenet
                title={'Shipping Information'}
                btnData={"Next Step"}
                func={saveAddress}
            />
        </FormContainer>
    )
}
