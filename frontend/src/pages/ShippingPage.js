import React, { useState } from 'react'

import { FormContainer } from '../components/FormContainer'
import { InputGroup,FormControl, Form, Button } from 'react-bootstrap'

export const ShippingPage = () => {
    const [ address, setAddress ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ zipcode, setZipCode ] = useState('')


    const handleSubmit = (evt) => {
        evt.preventDefault() 
        console.log(`
            Address: ${address}
            City: ${city}
            State: ${state}
            Zip Code: ${zipcode}
        `)
    }

    return (
        <FormContainer>
            <h1 className="text-center">Shipping</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="address">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Your Address"
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
                <Button className="btn-block" type='submit' variant='primary'>
                    Go to Next
                </Button>
            </Form>   
        </FormContainer>
    )
}
