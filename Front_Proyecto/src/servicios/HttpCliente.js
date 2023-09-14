import axios from 'axios';

//axios.defaults.baseURL = 'http://acuoponiawebapi-dev.us-east-1.elasticbeanstalk.com/Api'; //URL Produccion
axios.defaults.baseURL ='https://localhost:7109/Api'; //URL Prubas Local
axios.interceptors.request.use((config) => {
    const token_seguirdad = window.localStorage.getItem("token");
    if(token_seguirdad){
        config.headers.Authorization = 'Bearer ' + token_seguirdad;
        return config;
    }
    config.headers.Authorization = 'Bearer ';
    return config;
}, error => {
    return Promise.reject(error);
});

const requestGenerico = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put: (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url)
}

export default requestGenerico;