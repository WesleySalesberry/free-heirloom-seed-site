import React, { useState, useEffect } from 'react'
import { Form, Button, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer'
import { FormInputComponent } from '../components/FormInputComponent';
import { createAddress, updateAddress } from '../redux/shipping/shippingAction';
import { Notification } from '../components/Notification'

export const ShippingPage = ({ history }) => {
    const dispatch = useDispatch()
    const customer = useSelector(state => state.auth)
    const shipping = useSelector(state => state.address)

    const { address, error } = shipping
    const { user } = customer

    const [myAddress, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

    useEffect(() => {
        if(!user){
            history.push('/login')
        }
    }, [ user ])

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if(address === null){
            history.push('/order')
            dispatch(createAddress(myAddress, city, postalCode, state, country))
        }else{
            dispatch(updateAddress(myAddress, city, postalCode, state, country))
            history.push('/order')
        }
    }

    return (
        <FormContainer>
            {
                address === null ?
                    <h2 className="text-center">Create Address</h2> 
                : 
                    <h2 className="text-center">Update Address</h2>
            }
            {
                error ? <Notification>{error}</Notification> : ""
            }

            <Form onSubmit={handleFormSubmit}>
                <FormInputComponent
                            name={"street"}
                            label={'Street'}
                            placeholder={address&&address.address ? `Street: ${address.address}` : "Enter Street"}
                            value={myAddress}
                            onChange={(evt) => setAddress(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"city"}
                            label={'City'}
                            placeholder={address&&address.city ? `City: ${address.city}` : "Enter City"}
                            value={city}
                            onChange={(evt) => setCity(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"postalCode"}
                            label={'Postal Code'}
                            placeholder={address&&address.postal_code ? `Postal Code: ${address.postal_code}` : "Enter Postal Code"}
                            value={postalCode}
                            onChange={(evt) => setPostalCode(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"state"}
                            label={'State'}
                            placeholder={address&&address.state ? `State: ${address.state}` : "Enter State"}
                            value={state}
                            onChange={(evt) => setState(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"country"}
                            label={'Country'}
                            placeholder={address&&address.country ? `Country: ${address.country}` : "Enter Country"}
                            value={country}
                            onChange={(evt) => setCountry(evt.target.value)}
                        />
                        {
                            address === null ? 
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
                                    <LinkContainer to="/order">
                                        <Nav.Link>Use this address</Nav.Link>
                                    </LinkContainer>
                                </>
                        }
            </Form>
        </FormContainer>
    )
}
