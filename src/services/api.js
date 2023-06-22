import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

const api = axios.create({
  baseURL: 'https://localhost:8080',
  httpsAgent: agent
});

export default api;