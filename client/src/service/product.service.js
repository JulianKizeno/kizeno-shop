import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getProducts = () => this.service.get('/allProducts')
    getProduct = productId => this.service.get(`/oneProduct/${productId}`)
    saveProduct = theProduct => this.service.post(`/postProduct`, theProduct)
}