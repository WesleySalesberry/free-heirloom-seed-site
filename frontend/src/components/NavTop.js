import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../redux/auth/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { NavComponent } from './NavComponent'

export const NavTop = () => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { user } = auth

    const logoutHandler = () => dispatch(logout())



    return (
        
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Heirloom Seed</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            user ? 
                                <NavComponent
                                    leadIcon={'fas'}
                                    link={'/'}
                                    icon={"sign-out-alt"}
                                    title={"Log Out"}
                                    user={user.first_name}
                                    onClick={logoutHandler}
                                />
                            :
                                <NavComponent
                                    link={'/login'}
                                    leadIcon={'far'}
                                    icon={"user"}
                                    title={"Log In"}
                                />
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}


