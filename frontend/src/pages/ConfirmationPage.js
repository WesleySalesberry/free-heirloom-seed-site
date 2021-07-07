import React from 'react'
import { Container, Row, Col, Jumbotron, ListGroup } from 'react-bootstrap'


export const ConfirmationPage = () => {
    return (
        <Container className="mt-3" fluid>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Jumbotron className="text-center" fluid>
                        <i class="fas fa-check-square"></i>
                        <p className="mt-2">Order Confirmed</p>
                    </Jumbotron>
                    {""}
                    <Jumbotron className="text-center" fluid>
                        test
                    </Jumbotron>
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <h2>Delivery Info: <i class="fab fa-paypal"></i> Paypal</h2>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <h2><i class="fas fa-map-marker-alt"></i>Address: </h2>
                        <ListGroup.Item>
                            <ul>
                                <li>Street</li>
                                <li>City</li>
                                <li>Postal Code</li>
                                <li>State</li>
                                <li>Country</li>
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Payment Method: <i class="fab fa-paypal"></i> Paypal
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <h2><i class="fas fa-shopping-cart"></i> Cart Items: </h2>
                    </ListGroup>
                </Col>
                
            </Row>
        </Container>
    )
}
