// src/app/utils/printful.ts

import axios from 'axios';

const printfulApi = axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
    }
});

export default printfulApi;