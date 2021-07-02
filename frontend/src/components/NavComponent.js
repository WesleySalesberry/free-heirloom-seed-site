import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const NavComponent = ({ link, leadIcon, icon, title, user, onClick}) => {
    return (
        <Nav>
            <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart </Nav.Link>
            </LinkContainer>
            {
                user ?
                <LinkContainer to="/profile">
                    <Nav.Link>Signed in as: {user}</Nav.Link>
                </LinkContainer>
                :
                <></>
            }
            <LinkContainer to={`${link}`}>
                <Nav.Link onClick={onClick}><i className={`${leadIcon} fa-${icon}`}></i> {title}</Nav.Link>
            </LinkContainer>

        </Nav>
    )
}
