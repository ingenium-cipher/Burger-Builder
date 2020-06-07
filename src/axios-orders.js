import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-react-bace8.firebaseio.com/'
})

export default instance;