import axios from 'axios'

const api = axios.create({
  baseURL: 'https://monster-web-image.herokuapp.com'
})

export default api
