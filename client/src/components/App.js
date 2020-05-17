import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './ui/navbar/Navbar'
import ProductList from './pages/product-list/ProductList'
import ProductDetails from './pages/product-details/ProductDetails'
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


  setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))
  // setTheProduct = productObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))

  addToCart = (productId) =>{
    let cart = this.state.cart
    console.log(cart)
    if(cart.filter(elm => elm.id === productId).length){
      cart = cart.map(elm => {
        if(elm.id === productId){
          elm.count ++
        }
        return elm
      })
    }else{
      cart.push({
        id: productId,
        count: 1
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

    this.fetchUser()

    return (
      <>
        <Navigation cart={this.state.cart} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <main>

          <Switch>
            <Route path="/products" exact render={() => <ProductList loggedInUser={this.state.loggedInUser} />} />
            <Route path="/products/oneProduct/:productId" render={props => <ProductDetails addToCart={this.addToCart} {...props} />} />
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
