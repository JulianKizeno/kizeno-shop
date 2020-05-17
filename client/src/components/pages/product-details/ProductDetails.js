import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditProductForm from '../product-form/EditProductForm'



import './ProductDetails.css'

import { Link } from 'react-router-dom'

class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
        }
        console.log(props)
        this.productService = new ProductService()
    }

    handleModal = visible => this.setState({ modalShow: visible })
    hideModal = () => this.setState({ modalShow : false})

    getProductInfo() {
        const id = this.props.match.params.productId
        this.productService.getProduct(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getProductInfo()
    }

    finishProductPost = () => {
        this.handleModal(false)
        this.getProductInfo()
    }

    render() {
        return (
            <Container as="section" className="product-details">

                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EditProductForm finishProductPost={this.finishProductPost} hideModalWindow={this.hideModal} {...this.state} closeModal={() => this.handleModal(false)}/>
                    </Modal.Body>
                </Modal>

                <h1>{this.state.name}</h1>
                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 1 }}>
                        <h4>Details</h4>
                        <ul>
                            <li>Category: {this.state.category}</li>
                            <li>Price: {this.state.price}</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <img src={this.state.img} alt={this.state.name}></img>
                    </Col>
                </Row>
                <Link to="/products" className="btn btn-dark">Back</Link>
                <Button onClick={() => this.handleModal(true)} variant="dark" className="btn btn-dark">Edit</Button>
                <Button onClick={() => this.props.addToCart(this.state._id)} variant="dark" className="btn btn-dark">Add to Cart </Button>

            </Container>
        )
    }
}

export default ProductDetails 