import axios from 'axios';

// Set config defaults when creating the instance
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_URL = `http://10.198.71.36:4040`;
const qa = `http://10.198.73.15:4040`;
const dev = `http://10.198.68.21:4040`;
const useAxios = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? dev : qa,
	headers: { common: { token: localStorage.getItem('token') } },
});
axios.defaults.headers['Content-Type'] = 'application/json';

export default useAxios;
