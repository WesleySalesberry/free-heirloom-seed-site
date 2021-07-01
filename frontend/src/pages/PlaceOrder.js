import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import { LinkContainer } from 'react-router-bootstrap'
import { Nav} from 'react-bootstrap'

import { FormContainer } from '../components/FormContainer'
import { PayPalComponent } from '../components/PayPalComponent'
import { MailInfoComponent } from '../components/MailInfoComponent'

import payments from '../utils/paymentsMethods'

export const PlaceOrder = ({ history }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const shipping = useSelector(state => state.address)
    const myCart = useSelector(state => state.cart)

    const { address } = shipping
    const { cartItems } = myCart

    const [ payment, setPayment ] = useState('')

   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)

    if(!user){
        history.push('/login')
    }

    const handlePayment = (evt) => {
        evt.preventDefault()
        console.log(payment)
    }

    return (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        {
                                cartItems.sort((it1, it2) => it1.seedID.localeCompare(it2.seedID)).map(item => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={`https://res.cloudinary.com/wes1696/${item.image}`} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/seed/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                Suggested Donation: ${item.price}
                                            </Col>
                                            <Col md={2}>Quantity: {item.quantity}</Col>
                                            <Col md={2}>Seed ID: {item.seedID}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                            <p>Street: <strong>{address&&address.address}</strong></p>
                            <p>City: <strong>{address&&address.city}</strong></p>
                            <p>State: <strong>{address&&address.state}</strong></p>
                            <p>Postal Code: <strong>{address&&address.postal_code}</strong></p>
                            <p>Country <strong>{address&&address.country}</strong></p>
                            <LinkContainer to="/shipping">
                                <Nav.Link>Update Address?</Nav.Link>
                            </LinkContainer>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
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
                                {
                                    payment === 'mail' ?
                                    <MailInfoComponent />
                                    :
                                    ""
                                }
                                {
                                    payment === 'credit' ?
                                    <PayPalComponent />
                                    :
                                    ""
                                }
                                {
                                    payment === 'paypal' ?
                                        <Button type="button">Paypal Button</Button>
                                    :
                                        ""
                                }
                                </Form.Group>
                            </Form>

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="text-center">
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <h5>Total:</h5>
                                    </Col>
                                    <Col>
                                        <p>${total}</p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
