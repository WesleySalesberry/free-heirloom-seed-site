import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const Seeds = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/seed/${product.slug}`}>
                <Card.Img src={`https://res.cloudinary.com/wes1696/${product.image}`} alt={product.name}/>
            </Link>
            <Card.Body>
                <Link to={`/seed/${product.slug}`}>
                    <Card.Title>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}
