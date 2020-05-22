import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './ui/navbar/Navbar'
import ProductList from './pages/product-list/ProductList'
import ProductDetails from './pages/product-details/ProductDetails'
import CartList from './pages/cart/CartList'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

import AuthService from './../service/auth.service'

class App extends Component {

  constructor() {
    super()
    this.state = { 
      loggedInUser: null, 
      cart: [] 
    }
    this.authService = new AuthService()
    
  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  addToCart = (productInfo) =>{
    
    let cart = [...this.state.cart]
    const timesProductInCart = cart.filter(elm => elm._id === productInfo._id).length

    if(timesProductInCart){
      cart = cart.map(elm => {
        if(elm._id === productInfo._id){
          elm.price += productInfo.price
          elm.count++
        }
        return elm
      })
    }else{
      cart.push({
        _id: productInfo._id,
        product: productInfo,
        count: 1,
        price: productInfo.price
      })
    }
    this.setState({cart})   
 }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authService.isLoggedIn()
        .then(response => this.setTheUser(response.data))
        .catch(() => this.setTheUser(false))
    }
  } 


  render() {

    console.log(this.state.cart)

    this.fetchUser()

    return (
      <>
        <Navigation cart={this.state.cart} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} /> 

        <main>

          <Switch>
            <Route path="/products" exact render={props => <ProductList loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path="/products/oneProduct/:productId" render={props => <ProductDetails loggedInUser={this.state.loggedInUser} cart={this.state.cart} addToCart={this.addToCart} {...props} />} />
            <Route path="/cart" exact render={props => <CartList cart={this.state.cart} loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
            <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          </Switch>

        </main>
      </>
    )
  }
}

export default App
