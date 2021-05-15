import React, { useState, useEffect } from 'react'

import { FormContainer } from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

export const ShippingComponenet = ({title, btnData, func, myAddress, myCity, myState, myZipcode, myCountry}) => {

    const dispatch = useDispatch()

    const [ address, setAddress ] = useState(myAddress)
    const [ city, setCity ] = useState(myCity)
    const [ state, setState ] = useState(myState)
    const [ zipcode, setZipCode ] = useState(myZipcode)
    const [ country, setCountry ] = useState(myCountry)

    const handleSubmit = (evt) => {
        evt.preventDefault() 
        dispatch(func({
            'address': address,
            'city': city,
            'state': state,
            'postal_code': zipcode,
            'country': country
        }))
    }

    return (
        <div>
            {
                title ? <h1 className="text-center">{title}</h1> : ''
            }
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="address">
                    <Form.Control
                        required
                        type="text"
                        placeholder='Enter Your Address'
                        value={address}
                        onChange={(evt) => setAddress(evt.target.value)}
                    ></Form.Control>
                    
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your City"
                        value={city}
                        onChange={(evt) => setCity(evt.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="state">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your State"
                        value={state}
                        onChange={(evt) => setState(evt.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="zipcode">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Zip Code"
                        value={zipcode}
                        onChange={(evt) => setZipCode(evt.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your County"
                        value={country}
                        onChange={(evt) => setCountry(evt.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className="btn-block" type='submit' variant='primary'>
                    {btnData}
                </Button>
            </Form>   
        </div>
    )
}
