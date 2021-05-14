import React, { useState, useEffect } from 'react'
import { FormContainer } from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/auth/authAction'
import { Notification } from '../components/Notification'

export const Login = ({ location, history }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { userInfo, isLoggedIn, error } = auth

    const redirect = location.search ? location.search.split('=')[1] : '/profile'


    useEffect(() => {
        if(isLoggedIn){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (evt) => {
        evt.preventDefault()
        dispatch(login(email, password))
        
    }
    return (
        <FormContainer>
            <h1 className="text-center">Sign In</h1>
            {
                error && <Notification
                            variant="danger"
                         >{error}</Notification>
            }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Control
                        type='email'
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        type='password'
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className="btn-block" type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    <div className="text-center">
                        <p>Need an Account? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> Register Here!</Link></p> 
                        
                    </div>
                </Col>
            </Row>
        </FormContainer>
    )
}
