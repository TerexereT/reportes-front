import axios from 'axios';

// Set config defaults when creating the instance
const API_URL = `10.198.73.15:4040`;
const useAxios = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? `http://10.198.68.21:4040` : API_URL,
	headers: { common: { token: localStorage.getItem('token') } },
});
axios.defaults.headers['Content-Type'] = 'application/json';

export default useAxios;
