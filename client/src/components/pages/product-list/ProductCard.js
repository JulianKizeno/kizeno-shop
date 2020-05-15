import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class ProductCard extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }


    render() {
        return (
            <Col lg={3} md={6}>
                <Card as="article">
                    <Card.Img variant="top" src={this.props.img} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Link to={`/products/oneProduct/${this.props._id}`} className="btn btn-dark btn-block btn-sm">Details</Link>
                        <Button onClick={this.props.deleteProduct}  className="btn btn-dark btn-block btn-sm">Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
    
}



export default ProductCard