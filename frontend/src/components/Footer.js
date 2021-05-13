import React from 'react'

import { Container, Row, Col, ListGroup } from 'react-bootstrap';

export const Footer = () => {
    return (
        <footer variant="dark">
            <Container bg="dark" variant="dark" expand="lg">
                <Row className="text-center py-3">
                   <Col md={4}>
                       <h4>Sponsers</h4>
                       <ListGroup variant="flush">
                           <ListGroup.Item>
                               <a href="https://www.notforprofitcbd.org/" target="_blank" rel="noopener noreferrer">CBD</a>
                           </ListGroup.Item>
                       </ListGroup>
                   </Col>
                   <Col md={4}>
                       <h4>Resources</h4>
                       <ListGroup variant="flush">
                           <ListGroup.Item>
                               <a href="https://www.seedsavers.org/site/pdf/crop_chart.pdf" target="_blank" rel="noopener noreferrer">Crop Chart</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <a href="https://www.livingseedlibrary.weebly.com/" target="_blank" rel="noopener noreferrer">Seed Library</a>
                            </ListGroup.Item>
                       </ListGroup>
                       
                   </Col>
                   <Col md={4}>
                    <h4>Retail Partners</h4>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <a href="https://www.beadsupply.com/" target="_blank" rel="noopener noreferrer">Bead Supply</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <p className="text-center py-3">Copyright &copy; {new Date().getFullYear()} By <a href="https://www.linkedin.com/in/wessalesberry/" target="_blank" rel="noopener noreferrer">Wesley Salesberry</a></p>
                
            </Container>   
        </footer>
    )
}
