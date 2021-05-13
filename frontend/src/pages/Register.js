import React, { useState } from 'react'
import { FormContainer } from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Register = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifyPassword, setVerifiedPassword ] = useState('')
    const [message, setMessage] = useState('')


    const submitHandler = (evt) => {
        evt.preventDefault()
        if(password !== verifyPassword){
            setMessage('Passwords Do not match..')
        }else{
            console.log(
            `
            Name: ${name},
            Email: ${email},
            Password: ${password}
            `
        )
            }
    }

    return (
        <FormContainer>
            <h1 className="text-center">Register</h1>
            {
                message && <h3>{message}</h3> 
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
        </FormContainer>
    )
}
