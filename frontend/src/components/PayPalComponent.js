import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from './FormContainer'

export const PayPalComponent = ({ history }) => {

    const handleSubmit = (evt) => {
        evt.preventDefault()
        history.push('/order')
    }

    return (
        <FormContainer>
            <h3>PayPal Credit Payment</h3>
            <Form onSubmit={handleSubmit}>
                <p>Payment info goes here</p>
                <Button type='submit' variant='primary'>Submit</Button>
            </Form>
        </FormContainer>
    )
}
