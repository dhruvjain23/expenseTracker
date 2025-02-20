import axios from 'axios'

const BASE_URL= "http://localhost:3000"

export const connectionBackend = axios.create({
    baseURL:BASE_URL
})