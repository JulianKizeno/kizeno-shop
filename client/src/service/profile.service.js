import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }
    getProfile = ({id}) => this.service.get(`/${id}`)
}