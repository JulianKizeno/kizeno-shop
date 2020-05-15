import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const ProductCard = props => {

    return (
        <Col lg={3} md={6}>
            <Card as="article">
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Link to={`/products/${props.id}`} className="btn btn-dark btn-block btn-sm">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard