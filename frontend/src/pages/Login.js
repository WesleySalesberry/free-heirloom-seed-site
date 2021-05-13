import React, { useState} from 'react'
import { FormContainer } from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const submitHandler = (evt) => {
        evt.preventDefault()
        console.log('Login Submited')
    }
    return (
        <FormContainer>
            <h1 className="text-center">Sign In</h1>
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
                        <p>Need an Account? <Link to="/register"> Register Here!</Link></p> 
                        
                    </div>
                </Col>
            </Row>
        </FormContainer>
    )
}
