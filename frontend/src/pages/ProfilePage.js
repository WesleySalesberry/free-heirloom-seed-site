import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button, Container, Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';
import { ShippingComponenet } from '../components/ShippingComponenet';
import { updateUser } from '../redux/auth/authAction'
import { getAddress } from '../redux/shipping/shippingAction';



export const ProfilePage = ({ history }) => {
    const [ myName, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifyPassword, setVerifiedPassword ] = useState('')

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { userInfo, isLoggedIn } = auth

    const addy = useSelector(state => state.address)
    const { address } = addy

    useEffect(() => {
        if(!isLoggedIn){
            history.push('/login')
        }
        dispatch(getAddress())
    }, [dispatch, history, userInfo])
    
    const submitHandler = (evt) => {
        evt.preventDefault()
        dispatch(updateUser({
            'name': myName,
            'email': email,
            'password': password
        }))
    }
    

    return (
        <Container>
            <h2 className="text-center">Welcome {userInfo.name}!</h2>
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
                <Col md={6}>
                    <h2 className="text-center">Update Your Login Infomation</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Control
                                type='text'
                                placeholder="Update Your Name"
                                value={myName}
                                onChange={(evt) => setName(evt.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Control
                                type='email'
                                placeholder="Update Your Email"
                                value={email}
                                onChange={evt => setEmail(evt.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control
                                type='password'
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={evt => setPassword(evt.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='verifyPassword'>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Your Password'
                                value={verifyPassword}
                                onChange={(evt) => setVerifiedPassword(evt.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
    
                        <Button
                            className="btn-block"
                            type="submit"
                            variant="primary"
                        >Update {userInfo.name}</Button>

                        <Form.Text className="text-muted">
                                You will see the changes on next login
                        </Form.Text>
                    </Form>
                </Col>
                <Col md={6}>
                    <h2 className="text-center">Update Your Shipping Infomation</h2>
                    <ShippingComponenet
                        btnData={"Update Address"}
                        myAddress={address&&address.address}
                        myCity={address&&address.city}
                        myState={address&&address.state}
                        myZipcode={address&&address.postal_code}
                        myCountry={address&&address.country}
                    />
                </Col>
            </Row>
        </Container>
    )
}
