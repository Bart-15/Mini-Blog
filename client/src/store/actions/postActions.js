import {POST_LOADING, FETCH_ALL_POST, GET_ERRORS, GET_POST} from './types'
import * as post from '../../api/post';


export const createPost = (formData, navigate) => async(dispatch) => {
    try {
        await post.createPost(formData);
        dispatch(navigate('/'))
    }catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload:e.response ? e.response.data : {}
        })
    }
}


export const postLoading = () => {
    return {type:POST_LOADING}
}

export const getAllPosts = () =>  async(dispatch) => {
    dispatch(postLoading())
    try {
      const {data} = await post.getPosts();
      dispatch({type:FETCH_ALL_POST, payload:data});
    } catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload:e.response ? e.response.data : {}
        })
    }
}

export const getPost = (id, navigate) => async(dispatch) => {
    dispatch(postLoading())
    try {
        const {data} = await post.getPost(id)
        dispatch({type:GET_POST, payload:data})
    } catch(e) {
        if(e.response.status === 404) {
           dispatch(navigate('/'))
        }
        dispatch({
            type:GET_ERRORS,
            payload:e.response ? e.response.data : {}
        })
    }
}

export const deletePost = (id, navigate) => async (dispatch) => {
    try {
        if(window.confirm('Are you sure you want to delete this post?')) {
            await post.deletePost(id);
            dispatch(navigate('/'))
            dispatch(getAllPosts())
        } else return;
    }catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload:e.response ? e.response.data : {}
        })
    }
}

export const updatePost = (id, data, navigate) => async(dispatch) => {
    try {
        await post.updatePost(id, data);
        dispatch(navigate('/'))
        dispatch(getAllPosts())
    } catch(e) {
        dispatch({
            type:GET_ERRORS,
            payload:e.response ? e.response.data : {}
        })
    }
}