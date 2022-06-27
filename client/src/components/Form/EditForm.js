import React, {useState, useEffect} from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as postApi from '../../api/post';
import {updatePost} from '../../store/actions/postActions'
import LoadingSpinner from '../Spinner/LoadingSpinner';
import {Grid, TextField, Paper} from '@mui/material';
import {
  FormTitle, 
  RootContainer, 
  QuillContainer, 
  SubmitBtn, 
  FileBase as FileBaseContainer, 
  CustomError,
  ImageCard} 
from './styledForm';


import {validatePostInput} from '../../validation/postValidation';

const initialState = {
  title: "",
  author: "",
  richText:""
}

const EditForm = () => {

  const {id} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quill, quillRef } = useQuill();

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [imgData, setImgData] = useState("");

  const [prevImg, setPrevImg] = useState("");
  
  useEffect(() => {
    async function fetchData(){
      try {
        if(id) {
          const {data} = await postApi.getPost(id);
          dispatch({type:"GET_POST", payload:data});
          setFormData(data);
        }
      }catch(e) {
        if(e.response.status === 404) {
          navigate('/')
        }
      }
    }
    fetchData();
  }, [id])  

  const {post} = useSelector((state) => state.post)
  
  useEffect(() => {
    setFormData({
      title:post.title ? post.title : "", 
      author:post.author ? post.author : "",
      richText:post.richText ? post.richText : "",
    })
    setImgData(post.image ? post.image : "")
  }, []);
  
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(`${formData?.richText ? formData.richText : message}`);
      quill.on('text-change', (delta, oldDelta, source) => {
      setMessage(quill.root.innerHTML)
    });
  }
  }, [quill])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPrevImg(file)
    setImgData(file)
    }
  
  const handleUpdate = (e) => {
    e.preventDefault();
    const carbonData = {
      title: formData.title,
      author: formData.author,
      richText: formData.richText
    }

    const {isValid, errors} = validatePostInput(carbonData);

    if(!isValid) return setErrors(errors)

    try {
      setErrors({})

      const updatedData = new FormData();
            updatedData.append('image', imgData);
            updatedData.append('title', carbonData.title);
            updatedData.append('author', carbonData.author);
            updatedData.append('richText', message);
      dispatch(updatePost(id, updatedData, navigate));
      
    }catch(e) {
      console.log(e)
    }
    
    }
    return (
    <RootContainer>
      {
        (post === null) ? (<LoadingSpinner />) : (
          <Paper component="form"  elevation={16} onSubmit={handleUpdate}>
          <FormTitle variant="h4">Update Post</FormTitle>
            <Grid container p={5} spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField 
                  name="title" 
                  error={errors.title ? true : false} 
                  label="Title" 
                  value={formData.title} 
                  onChange={handleChange}
                  helperText={errors.title ? errors.title : ""} 
                  fullWidth/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  name="author" 
                  error={errors.author ? true : false} 
                  label="Author" 
                  value={formData.author} 
                  onChange={handleChange}
                  helperText={errors.author ? errors.author :  ""} 
                  fullWidth/>
              </Grid>
            </Grid>
            <Grid container pl={5} pr={5} pb={2}>
              <QuillContainer item xs={12} spacing={3}>
                <div ref={quillRef} />
                  <CustomError variant="subtitle1" color="error">{errors.message ? errors.message : ""}</CustomError>
              </QuillContainer>
              <FileBaseContainer>
                <ImageCard 
                  component="img"
                  height="150"
                  image={prevImg ? URL.createObjectURL(prevImg) : `http://127.0.0.1:8000/${imgData}`}
                >
                </ImageCard> 
                <input type="file" onChange={handleImage} />
                <CustomError variant="subtitle1" color="error">{!imgData ? "*Required" : ""}</CustomError>
              </FileBaseContainer>
            </Grid>
            <Grid container>
              <Grid item pl={5} pb={3}>
                <SubmitBtn type="submit">Update</SubmitBtn>
              </Grid>
            </Grid>
          </Paper>
        )
      }
    </RootContainer>
  )
}

export default EditForm