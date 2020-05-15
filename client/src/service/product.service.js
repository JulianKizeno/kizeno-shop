import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getProducts = () => this.service.get('products/allProducts')
    getProduct = productId => this.service.get(`products/oneProduct/${productId}`)
    saveProduct = theProduct => this.service.post(`products/postProduct`, theProduct)
    deleteProduct = id => this.service.post(`products/${id}/delete`, id);


}