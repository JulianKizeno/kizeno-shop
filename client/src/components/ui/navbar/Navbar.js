import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthService from './../../../service/auth.service'

import './Navbar.css'
import { Link } from 'react-router-dom'



class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.authService = new AuthService()
    }

    logout = () => {
        this.props.setTheUser(false)
        this.authService.logout()
    }

    
    getCartCount = () => {
        const product = this.props.cart.filter(elm => elm.id === this.state._id)
        return product.length ? product[0].count : 0
    }

    sumCount = () =>{
        let totalProducts = 0 
        this.props.cart.map(elm => totalProducts += elm.count)
        return totalProducts
    }
    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="md" fixed="top" >
                <Navbar.Brand as="div"><Link to="/"></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as="div"><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link as="div"><Link to="/products">Products</Link></Nav.Link>

                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link as="div"><Link to="/login">Login</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/signup">Signup</Link></Nav.Link>
                                </>
                                    :
                                <>
                                    <Nav.Link as="div"><Link to="/profile">My Profile</Link></Nav.Link>
                                    <Nav.Link as="div" onClick={this.logout} style={{cursor: 'pointer'}}>Logout</Nav.Link>
                                </>
                        }

                    </Nav>
                       {
                            this.props.loggedInUser && this.props.loggedInUser.role === "CLIENT" &&
                               
                            <>
                            {

                                !this.props.cart.length ? 
                                    <>
                                        <Navbar.Text className="ml-auto"> <Nav.Link as='div'> <Link to='/cart' className="cart">Cart 0</Link> </Nav.Link></Navbar.Text>
                                    </>
                                    :
                                    <>
                                        <Navbar.Text className="ml-auto"> <Nav.Link as='div'> <Link to='/cart'>Cart {this.sumCount()} </Link> </Nav.Link> </Navbar.Text>
                                    </>
                                    
                            }
                            </>
    
                       }
                    {/* <Navbar.Text className="ml-auto"> Hello, {this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'} </Navbar.Text> */}
                </Navbar.Collapse>

            </Navbar>
        )
    }

}

export default Navigation