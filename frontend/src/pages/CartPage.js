import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { addToCart, removeItemFromCart, emptyCart } from '../redux/cart/cartAction'


export const CartPage = ({ match, location, history }) => {
    const seedName = match.params.slug
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.auth)
    const { cartItems } = cart

    const redirect = location.search ? location.search.split('=')[1] : '/profile'

    useEffect(() => {
        if(!user){
            history.push(redirect)
        }
        if(seedName){
            dispatch(addToCart(seedName))
        }
    }, [dispatch, seedName, history, user, redirect ])

    const removeFromCart = (id) =>  {
        dispatch(removeItemFromCart(id))
    }

    const clearItems = () => dispatch(emptyCart())
    const checkoutHandler = () => history.push('/login?redirect=shipping')

    return (
        <Row mt={4}>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 
                    ?
                        ( <div> Your cart is empty  <Link to="/">Go Shopping</Link> </div>)
                    :
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Link to="/">Continue Shopping</Link>
                            </ListGroup.Item>
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
                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCart(item.id)}
                                                ><i className='fas fa-trash'></i></Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        {
                            cartItems.length === 0 ? 
                                <></>
                            :
                            
                                <ListGroup.Item>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        className="btn-block"
                                        disabled={cartItems.length === 0}
                                        onClick={() => clearItems()}
                                    >
                                        Clear Cart
                                    </Button>
                                </ListGroup.Item>
                        }
                        <ListGroup.Item>
                            <h2>Total Items: {cartItems.length}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Recommended Donation:
                            ${
                                cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
                            } </h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            { cartItems.length === 0 ? "Your Cart is empty" : "Proceed To Checkout" }
                        </Button>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <div mx={5}>
                <Row>
                    <Col md={6}>
                        <h3>Request Guidelines</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                1. By requesting seeds from this site you agree that the seeds are for your own personal use and you will do everything in your power to plant & care for them this season.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                2. We will not give you multiple packs of any one variety of seed. This gives a chance for as many people as possible to grow & save rare seeds.
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <h3>Other ways to request seeds</h3>
                        <ListGroup variant="flush">
                            <h6> Option 1: By Mail</h6>
                            <ListGroup.Item>
                                
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant="flush">
                            <h6> Option 2: Pick Up</h6>
                            <ListGroup.Item>
                                12-5 on Monday thru Saturday at:
                                <p>Stone Spirits</p>
                                <p>865#B - 8th Street</p>
                                <p>Arcata, CA 95521</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        </Row>
    )
}
