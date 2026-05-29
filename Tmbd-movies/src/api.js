import axios from 'axios'
const baseURL = import.meta.env.URL;

const API = axios.create({
  baseURL
})

API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('token')

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  (error) => {

    return Promise.reject(error)
  }
)

export default API