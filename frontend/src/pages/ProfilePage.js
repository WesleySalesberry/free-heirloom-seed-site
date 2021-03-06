import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button, Container, Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { getUser, updateUser } from '../redux/auth/authAction'
import { updateAddress } from '../redux/shipping/shippingAction';

import { FormInputComponent } from '../components/FormInputComponent';
import { Notification } from '../components/Notification';
import { TableComponent } from '../components/TableComponent';



export const ProfilePage = ({ history }) => {
    const auth = useSelector(state => state.auth)
    const { user, error } = auth

    const addy = useSelector(state => state.address)
    const { address } = addy

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [myAddress, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        if(!user){
            history.push('/login')
        }
    }, [history, user])
    
    const handleUserUpdate = (evt) => {
        evt.preventDefault()
        dispatch(updateUser(firstName, lastName, email))
        dispatch(getUser())
        setFirstName("")
        setLastName("")
        setEmail("")
        history.push('/profile')
    }

    const handleAddressUpdate = (evt) => {
        evt.preventDefault()
        dispatch(updateAddress(myAddress, city, postalCode, state,  country))
        setAddress("")
        setCity("")
        setState("")
        setPostalCode("")
        setCountry("")
        history.push('/profile')
    }
    
    return (
        <Container>
            <Row> 
                <Col md={12}>
                    <TableComponent
                        name={user&&user.first_name}
                    />
                </Col>
            </Row>
            <Row className="my-4">
                {
                    error && <Notification variant="danger">{error}</Notification>
                }
                <Col md={6}>
                    <h2 className="text-center">Update Login Infomation</h2>
                    <Form onSubmit={handleUserUpdate}>
                        <FormInputComponent
                            name={"firstName"}
                            label={'First Name'}
                            placeholder={user&&user.first_name ? `First Name: ${user.first_name}` : "Enter First Name"}
                            value={firstName}
                            onChange={(evt) => setFirstName(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"lastName"}
                            label={'Last Name'}
                            placeholder={user&&user.last_name ? `Last Name: ${user.last_name}` : "Enter Last Name"}
                            value={lastName}
                            onChange={(evt) => setLastName(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"email"}
                            label={'Email'}
                            placeholder={user&&user.email ? `Email: ${user.email}` : "Enter Email"}
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                        <Button
                            className="btn-block"
                            type="submit"
                            variant="primary"
                        >Update</Button>
                        
                    </Form>
                </Col>
                <Col md={6}>
                    <h2 className="text-center">Update Shipping Infomation</h2>
                    <Form onSubmit={handleAddressUpdate}>
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
                            placeholder={address&&address.city ? `City: ${address.city}` : "Enter City Name"}
                            value={city}
                            onChange={(evt) => setCity(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"state"}
                            label={'State'}
                            placeholder={address&&address.state ? `State: ${address.state}` : "Enter Last Name"}
                            value={state}
                            onChange={(evt) => setState(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"postalCode"}
                            label={'Postal Code'}
                            placeholder={address&&address.postal_code ? `Postal: ${address.postal_code}` : "Enter Postal Code"}
                            value={postalCode}
                            onChange={(evt) => setPostalCode(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"country"}
                            label={'Country'}
                            placeholder={address&&address.country ? `Country: ${address.country}` : "Enter Country"}
                            value={country}
                            onChange={(evt) => setCountry(evt.target.value)}
                        />
                        <Button
                            className="btn-block"
                            type="submit"
                            variant="primary"
                        >Update</Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
