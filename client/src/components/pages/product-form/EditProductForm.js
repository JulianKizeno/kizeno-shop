import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class EditProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            price: this.props.price,
            category: this.props.category,
            img: this.props.img
        }
        console.log(props)
        this.productService = new ProductService()
    }

    handleInputChange = e => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.productService.updateProduct(this.props._id, this.state)
        .then(() => this.props.finishProductPost())
        .catch(err => console.log(err))
    }
    

    render() {
        return (
            <Container>

                <h1>Edit Product</h1>
                <hr></hr>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="text" value={this.state.price} onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="catego">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" type="text" value={this.state.category} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>URL-image</Form.Label>
                        <Form.Control name="img" type="text" value={this.state.img} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button variant="dark" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Close</Button>
                    <Button variant="dark" type="submit">Save Changes</Button>
                </Form>
            </Container>
        )
    }
}

export default EditProductForm