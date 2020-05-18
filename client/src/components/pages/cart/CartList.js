import React, { Component } from 'react'
import ProductService from '../../../service/product.service'

import './CartList.css'


import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
// import Button from 'react-bootstrap/Button'
//import Modal from 'react-bootstrap/Modal'


class CartList extends Component {

    constructor() {
        super()
        this.state = {
            products: [{}]
        }
        this.productService = new ProductService()
    }


//     getAllProducts = () => {
//         this.productService.getProducts()
//             .then(response => this.setState({ products: response.data }))
//             .catch(err => console.log(err))
//     }

//     componentDidMount = () => {
//         this.getAllProducts()
//     }

//     handleDelete = (productId) =>{
//         this.productService.deleteProduct(productId)
//             .then(response => {
//                 console.log(response)
//                 let products = [...this.state.products].filter(product => product._id !== response.data.deletedProduct)
//                 this.setState({products})
//             })
//             .catch(err => console.log(err))
//     }

//     finishProductPost = () => {
//         this.getAllProducts()
//         this.handleModal(false)
//         this.handletoast(true, 'Registro creado en BBDD')
//     }

    render() {
        return (
            <Container as="section">
                <Row style={{justifyContent: 'center', }}>
                    <Row style={{margin: '20px'}}>
                        <h1>Your Products </h1>
                    </Row>
                    
                    <Table bordered >
                        <thead>
                            <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>Jacob</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                

            </Container>
        )
    }
}

export default CartList