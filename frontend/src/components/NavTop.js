import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const NavTop = () => {
    return (
        
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Heirloom Seed</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="pl-2 ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link><i className="far fa-user"></i> Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}
