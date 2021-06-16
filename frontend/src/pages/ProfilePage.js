import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button, Container, Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from '../redux/auth/authAction'
import { updateAddress } from '../redux/shipping/shippingAction';

import { FormInputComponent } from '../components/FormInputComponent';
import { Notification } from '../components/Notification';



export const ProfilePage = ({ history }) => {
    const auth = useSelector(state => state.auth)
    const { user } = auth

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
        history.push('/profile')
    }

    const handleAddressUpdate = (evt) => {
        evt.preventDefault()
        dispatch(updateAddress(myAddress, city, state, postalCode, country))
    }
    
    return (
        <Container>
            <h2 className="text-center">Welcome {
                user&&user.first_name
            }!</h2>
            <Row> 
                <Col md={12}>
                    <h2 className="text-center">My Orders</h2>
                    <Table  striped bordered hover className="text-center" variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
            <Row className="my-4">
                {/* {
                    error && <Notification variant="danger">{error}</Notification>
                } */}
                <Col md={6}>
                    <h2 className="text-center">Update Login Infomation</h2>
                    <Form onSubmit={handleUserUpdate}>
                        <FormInputComponent
                            name={"firstName"}
                            label={'First Name'}
                            // placeholder={user.first_name ? `Name on File ${user.first_name}` : "Enter Last Name"}
                            value={firstName}
                            onChange={(evt) => setFirstName(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"lastName"}
                            label={'Last Name'}
                            // placeholder={user.last_name ? `Name currently on File ${user.last_name}` : "Enter Last Name"}
                            value={lastName}
                            onChange={(evt) => setLastName(evt.target.value)}
                        />
                        <FormInputComponent
                            name={"email"}
                            label={'Email'}
                            // placeholder={user.email ? `Email on File ${user.email}` : "Enter Last Name"}
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
