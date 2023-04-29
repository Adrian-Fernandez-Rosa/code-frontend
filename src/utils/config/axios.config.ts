import axios from 'axios';

export default axios.create(
    {
        baseURL: 'http://localhost:8000/api', // Base URL will add the endpoints of our backend app
        responseType: 'json',
        timeout: 6000
    }
)