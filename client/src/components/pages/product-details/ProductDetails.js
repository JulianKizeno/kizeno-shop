import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        this.productService = new ProductService()
    }

    handleModal = visible => this.setState({ modalShow: visible })
    hideModal = () => this.setState({ modalShow : false})

    getProductInfo = () => {
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
            <Modal
              show={this.state.modalShow}
              onHide={() => this.handleModal(false)}
            >
              <Modal.Body>
                <EditProductForm
                  finishProductPost={this.finishProductPost}
                  hideModalWindow={this.hideModal}
                  {...this.state}
                  closeModal={() => this.handleModal(false)}
                />
              </Modal.Body>
            </Modal>

            <h1>{this.state.name}</h1>
            <hr />
            <Row>
              <Col md={6}>
                <Link to="/products" className="button back-btn" style={{marginLeft: '30%'}}>
                  Products
                </Link>
                <Row style={{ justifyContent: "center", marginTop: "30px" }}>
                    { 
                        this.props.loggedInUser &&
                        this.props.loggedInUser.role === "ADMIN" && (
                        <>
                            <button onClick={() => this.handleModal(true)} className="button back-btn" style={{marginLeft: '30%', marginBottom: '20px'}}>
                            Edit
                            </button>
                        </>
                        )
                    }
                </Row>
                <Row>
                  <img src={this.state.img} alt={this.state.name} />
                </Row>
              </Col>
              <Col md={{ span: 4, offset: 1 }}>
                {this.props.loggedInUser &&
                  this.props.loggedInUser.role === "CLIENT" && (
                    <>
                      <button
                        onClick={() => this.props.addToCart(this.state)}
                        className="button add-to-cart"
                      >
                        Add to Cart{" "}
                      </button>
                    </>
                  )}
                <h4>D · e · t · a · i · l · s</h4>
                <ul>
                  <li>Category: {this.state.category}</li>
                  <li>Price: {this.state.price}</li>
                </ul>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default ProductDetails 