import React, { useState, useEffect } from 'react'
import { Form, Button, } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer'
import { FormInputComponent } from '../components/FormInputComponent';
import { createAddress, updateAddress } from '../redux/shipping/shippingAction';

export const ShippingPage = ({ history }) => {
    const dispatch = useDispatch()
    const shipping = useSelector(state => state.address)

    const { address } = shipping

    const [myAddress, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if(!address.id){
            dispatch(createAddress(myAddress, city, state, postalCode, country))
            history.push('/')
        }else{
            dispatch(updateAddress(myAddress, city, state, postalCode, country))
            history.push('/')
        }
    }

    return (
        <FormContainer>
            {
                !address.id ? 
                    <h2 className="text-center">Create Address</h2>
                : 
                    <h2 className="text-center">Update Address</h2>
            }
            <Form onSubmit={handleFormSubmit}>
                <FormInputComponent
                            name={"street"}
                            label={'Street'}
                            // placeholder={address.address ? `Street on File ${address.address}` : "Enter Street"}
                            value={myAddress}
                            onChange={(evt) => setAddress(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"city"}
                            label={'City'}
                            // placeholder={address.city ? `City on File ${address.city}` : "Enter Last Name"}
                            value={city}
                            onChange={(evt) => setCity(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"state"}
                            label={'State'}
                            // placeholder={address.state ? `State on File ${address.state}` : "Enter Last Name"}
                            value={state}
                            onChange={(evt) => setState(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"postalCode"}
                            label={'Postal Code'}
                            // placeholder={address.postal_code ? `Postal Code on File ${address.postal_code}` : "Enter Last Name"}
                            value={postalCode}
                            onChange={(evt) => setPostalCode(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"country"}
                            label={'Country'}
                            // placeholder={address.country ? `Country on File ${address.country}` : "Enter Last Name"}
                            value={country}
                            onChange={(evt) => setCountry(evt.target.value)}
                        />
                        {
                            !address.id ? 
                                <Button
                                    className="btn-block"
                                    type="submit"
                                    variant="primary"
                                >Create Address</Button>
                            : 
                                <>
                                    <Button
                                        className="btn-block"
                                        type="submit"
                                        variant="primary"
                                    >Update Address</Button>
                                    <Button
                                        className="btn-block"
                                        type="submit"
                                        variant="primary"
                                    >Update Address</Button>
                                </>
                        }
            </Form>
        </FormContainer>
    )
}
