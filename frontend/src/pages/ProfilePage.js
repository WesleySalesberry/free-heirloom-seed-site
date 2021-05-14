import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button, Container, Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';



export const ProfilePage = ({ history }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifyPassword, setVerifiedPassword ] = useState('')

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { userInfo, isLoggedIn } = auth

    useEffect(() => {
        if(!isLoggedIn){
            history.push('/login')
        }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [dispatch, history])
    
    const submitHandler = (evt) => {
        evt.preventDefault()
        console.log(`
            Name: ${name},
            Email: ${email}
        `)
    }

    const handleName = (evt) =>{
        setName(evt.target.value)
    }
    const handleEmail = (evt) =>{
        setEmail(evt.target.value)
    }
    

    return (
        <Container>
            <h2 className="text-center">Welcome {name}!</h2>
            <Row>
                
                <Col md={4}>
                    <h2 className="text-center">Update Your Infomation</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(evt) => handleName(evt)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={evt => handleEmail(evt)}
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
                        >Update</Button>
                    </Form>
                </Col>
                
                <Col md={6}>
                    <h2 className="text-center">My Orders</h2>
                    <Table  striped className="text-center">
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
