import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getPosts = () => axios.get(`${BASE_URL}/posts`, ); 

export const createPost = (data) => axios.post(`${BASE_URL}/posts`, data);

export const deletePost = (id) => axios.delete(`${BASE_URL}/posts/${id}`);

export const getPost = (id) => axios.get(`${BASE_URL}/posts/${id}`);

export const updatePost = (id, data) => axios.post(`${BASE_URL}/posts/${id}`, data, { params: {
   _method:'PATCH'
}});