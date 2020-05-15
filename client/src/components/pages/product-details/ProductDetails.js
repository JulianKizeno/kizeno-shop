import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './ProductDetails.css'

import { Link } from 'react-router-dom'

class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.productService = new ProductService()
    }


    getProductInfo() {
        const id = this.props.match.params.productId
        this.productService.getProduct(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getProductInfo()
    }

    render() {
        return (
            <Container as="section" className="product-details">
                <h1>{this.state.name}</h1>
                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 1 }}>
                        <h4>Details</h4>
                        <ul>
                            <li>Category: {this.state.category}</li>
                            <li>Price: {this.state.price}</li>
                            <li>Leather Type: {this.state.leatherType}</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <img src={this.state.img} alt={this.state.name}></img>
                    </Col>
                </Row>
                <Link to="/products" className="btn btn-dark">Back</Link>
            </Container>
        )
    }
}

export default ProductDetails 