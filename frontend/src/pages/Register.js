import React, { useState, useEffect } from 'react'
import { FormContainer } from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/auth/authAction'
import { Notification } from '../components/Notification'

export const Register = ({ location, history }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifyPassword, setVerifiedPassword ] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const {userInfo, loading, error } = auth

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push('/profile')
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (evt) => {
        evt.preventDefault()
        if(password !== verifyPassword){
            setMessage('Passwords Do not match..')
        }else{
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            
            <h1 className="text-center">Register</h1>
            {
                message && <Notification variant="danger">{message}</Notification>
            }
            {
                error && <Notification variant="danger">{error}</Notification>
            }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Control
                        required
                        type='text'
                        placeholder="Name"
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control
                        required
                        type='email'
                        placeholder="Email"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        required
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="verifyPassword">
                    <Form.Control
                        required
                        type='password'
                        placeholder="Confirm Your Password"
                        value={verifyPassword}
                        onChange={evt => setVerifiedPassword(evt.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className="btn-block" type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='text-center py-3'>
                <Col>
                    Existing Customer? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
