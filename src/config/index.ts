import axios, { AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

// Set config defaults when creating the instance

const dev = `http://localhost:4040`;

const useAxios = axios.create({
	//
	baseURL: process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL : dev,
	headers: {
		token: localStorage.getItem('token'),
		Authorization: `${localStorage.getItem('token')}`,
	},
});

useAxios.defaults.headers['Content-Type'] = 'application/json';

useAxios.interceptors.response.use((resp: AxiosResponse<any>): AxiosResponse<any> => {
	if (resp.data.access_token) {
		// console.log('entre', resp.data.access_token);
		localStorage.setItem('token', resp.data.access_token);
		resp.headers.Authorization = resp.data.access_token;
	}
	return resp;
});

useAxios.interceptors.request.use((config: any) => {
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });
//
export default useAxios;
