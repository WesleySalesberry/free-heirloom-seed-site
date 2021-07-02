import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { seedDetails  } from '../redux/seeds/seedAction'
import { Loader } from '../components/Loader'

export const SeedPage = ({ match, history }) => {
    const dispatch = useDispatch()
    const seedDetail = useSelector(state => state.seedDetails)
    const { seed, loading, error } = seedDetail

    useEffect(() => {
        dispatch(seedDetails(match.params.slug))
    }, [dispatch, match.params.slug])

    const addToCartHandler = (slug) => {
        history.push(`/cart/${slug}`)
        
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {
                loading ? 
                    <Loader />
                    : error ? <h1>{error}</h1>
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={`https://res.cloudinary.com/wes1696/${seed.image}`} alt={seed.name} fluid/>
                        </Col>
                        
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    {seed.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {seed.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Days to Maturity: {seed.maturity}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Seed ID: {seed.seedID}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Seed Size: {seed.is_oversized ? 'Large' : 'Small'}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                <strong>
                                                    {
                                                        seed.countInStock > 0 ? "In Stock" : "Out of Stock"
                                                    }
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button 
                                            className="btn btn-block" 
                                            disabled={seed.countInStock === 0}type="button"
                                            onClick={() => addToCartHandler(seed.slug)}
                                        >
                                            Order
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col> 
                    </Row>
            }
        </div>
    )
}
