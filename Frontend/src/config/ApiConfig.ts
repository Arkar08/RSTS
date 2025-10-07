import axios from 'axios'

const Axios = axios.create()

// Axios.defaults.baseURL = "https://rsts-vintage-shop-backend.onrender.com/api/v1/"
// Axios.defaults.baseURL = "http://localhost:8080/api/v1/"

Axios.defaults.baseURL = "http://209.38.90.90/api/v1/"


Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Baerer ${token}`
    }
    return config;
},
(error) => {
    return Promise.reject(error);
  },
)

export default Axios;