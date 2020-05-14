import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import './ProductList.css'

import ProductCard from './ProductCard'
import ProductForm from '../product-form/ProductForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'


class ProductList extends Component {

    constructor() {
        super()
        this.state = {
            modalShow: false,
            toast: {
                show: false,
                text: ''
            },
                products: []
        }
        this.productService = new ProductService()
    }


    handleModal = visible => this.setState({ modalShow: visible })
    handletoast = (visible, text = '') => {
        const toastCopy = { ...this.state.toast }
        toastCopy.show = visible
        toastCopy.text = text
        this.setState({ toast: toastCopy })
    }

    getAllProducts = () => {
        this.productService .getProducts()
            .then(response => this.setState({ products: response.data }))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.getAllProducts()
    }


    finishProductPost = () => {
        this.getAllProducts()
        this.handleModal(false)
        this.handletoast(true, 'Registro creado en BBDD')
    }

    render() {
        return (
            <Container as="section">

                <h1>Listado de montañas rusas</h1>

                {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" style={{ marginBottom: '20px' }}>Crear nueva montaña rusa</Button>}

                <Row className="products-list">
                    {this.state.products.map(elm => <ProductCard key={elm._id} {...elm} />)}
                </Row>


                <Modal show={this.state.modalShow} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <ProductForm finishProductPost={this.finishProductPost} closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>


                <Toast onClose={() => this.handletoast(false)} show={this.state.toast.show} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Mensaje</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.toast.text}</Toast.Body>
                </Toast>


            </Container>
        )
    }
}

export default ProductList