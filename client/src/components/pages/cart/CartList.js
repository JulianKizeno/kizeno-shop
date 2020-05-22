import React, { Component } from "react";
import CartService from "../../../service/cart.service";

import "./CartList.css";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button'


import { Link } from "react-router-dom";

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
    };
    this.cartService = new CartService();
  }

    finalPurchase = () => {
      alert(`purchase successfully. Please, check your email to complete`)
     }

     getCartInfo = () => {
    this.cartService
      .getCart()
      .then((response) => this.setState({ cart: response.data }))
      .catch((err) => console.log(err));
    };

    total = () =>{
      
        let subtotal = this.state.cart.map(elm => {
            if(elm.price === this.state.elm.price){
                elm.price 
            }
        })
        console.log(subtotal)
        cart = cart.map(elm => {
            if(elm._id === productInfo._id){
              elm.price += productInfo.price
              elm.count++
            }
            return elm
          })
        
    }

  render() {
    return (
      <Container as="section">
        <Row style={{ justifyContent: "center" }}>
          <h1>C · a · r · t</h1>
        </Row>
        <hr />
        <Link
          to="/products"
          style={{ marginBottom: "20px" }}
          className="button back-btn back-btn-cart"
        >
          Products
        </Link>
        <Table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cart.map((elm, idx) => (
              <tr key={idx}>
                <th>
                  <Link to={`/products/oneProduct/${elm._id}`}>
                    <img
                      className="product-picture"
                      src={elm.product.img}
                      alt={elm.product.name}
                    />
                  </Link>
                </th>
                <th>
                  <p style={{ marginTop: "65px" }}>{elm.product.name}</p>
                </th>
                <th>
                  <p style={{ marginTop: "65px" }}>{elm.product.price}</p>
                </th>
                <th>
                  <p style={{ marginTop: "65px" }}>{elm.count}</p>
                </th>
                <th>
                  <p style={{ marginTop: "65px" }}>{elm.price}</p>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
            <p>total {this.total()}</p>
        <Row style={{justifyContent: 'center'}}>
            <Button onClick={() => this.finalPurchase()} style={{ marginBottom: '50px', textAlign: 'end'}} variant="link" className='button back-btn'>finalize purchase</Button>
        </Row>

      </Container>
    );
  }
}

export default CartList;
