import axios from 'axios';

// Set config defaults when creating the instance

const dev = `http://10.198.68.21:4040`;
const useAxios = axios.create({
	baseURL: process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL : dev,
	headers: { common: { token: localStorage.getItem('token') } },
});
axios.defaults.headers['Content-Type'] = 'application/json';
//
export default useAxios;
