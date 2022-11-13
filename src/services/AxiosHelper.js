import axios from "axios";

const GetAxios = (token) => {
    axios.interceptors.request.use(function(config) {
        config.headers.Authorization = `Bearer ${token}`
    
        return config
    })

    return axios
}

export default GetAxios;