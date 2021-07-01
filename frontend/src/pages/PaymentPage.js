import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, InputGroup } from 'react-bootstrap'

import { FormContainer } from '../components/FormContainer'
import { PayPalComponent } from '../components/PayPalComponent'

import payments from '../utils/paymentsMethods'

export const PaymentPage = ({ history }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const shipping = useSelector(state => state.address)

    const { address } = shipping

    const [ payment, setPayment ] = useState('')

    if(!user){
        history.push('/login')
    }

    if(!address){
        history.push('/shipping')
    }

    const handlePayment = (evt) => {
        evt.preventDefault()
        console.log(payment)
        history.push('/order')
    }

    const handlePaymentOpition = (opt) => {
        setPayment(opt)
    }

    return (
        <div>

        </div>
    )
}

{/* <FormContainer>
            <Form onSubmit={handlePayment}>
                <Form.Group>
                    <Form.Label className="text-center" as="legend">Select Payment Method</Form.Label>
                        {
                            payments.map(itm => (
                                <Form.Check
                                    key={itm.id}
                                    type="checkbox"
                                    label={itm.label}
                                    name={itm.name}
                                    value={itm.name}
                                    checked={payment === itm.name}
                                    onChange={(evt) => setPayment(evt.target.value)}
                                >
                                </Form.Check>
                            ))
                        }
                </Form.Group>
                {
                    payment === "mail" ? 
                        <Button type='submit' disabled={payment !== "mail"} variant='primary'>Submit</Button>
                    :
                        ""
                }

                {
                    payment === "paypal" ? 
                        <Button type='submit'variant='primary'>Paypal Button</Button>
                    :
                        ""
                }
                
            </Form>
            {
                payment === "credit" ? 
                    <PayPalComponent/>
                :
                    ""
            }
        </FormContainer> */}