import React, {useState, useEffect} from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import {Grid, TextField, Paper} from '@mui/material';
import {FormTitle, RootContainer, QuillContainer, SubmitBtn, FileBase as FileBaseContainer, CustomError, ImageCard} from './styledForm';
import {useDispatch} from 'react-redux';
import {createPost} from '../../store/actions/postActions';
import {validatePostInput} from '../../validation/postValidation';
import { useNavigate } from 'react-router-dom';


const initalState = {
  title:'',
  author:'',
}

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initalState)
  const { quill, quillRef } = useQuill();
  const [message, setMessage] = useState("");
  const [imgData, setImgeData] = useState("");
  const [prevImg, setPrevImg] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (quill) {
     quill.clipboard.dangerouslyPasteHTML("");
     quill.on('text-change', (delta, oldDelta, source) => {
     setMessage(quill.root.innerHTML)
   });
 }
 }, [quill]);
 
 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name] : e.target.value
  })
 }

 const handleImage = (e) => {
   const file = e.target.files[0];
   setImgeData(file)
   setPrevImg(file)
  }
  
 const handleSubmit = (e) => {
   e.preventDefault();

   const carbonData = {title: formData.title, author: formData.author, richText:message}

   const {isValid, errors}  = validatePostInput(carbonData);
   if(!isValid) return setErrors(errors)

    try {
      setErrors({})
      const data = new FormData();
        data.append('image', imgData);
        data.append('title', carbonData.title);
        data.append('author', carbonData.author);
        data.append('richText', carbonData.richText);

      dispatch(createPost(data, navigate));
  }catch(e) {
    console.log(e.message)
  } 

}
  
  return (
    <RootContainer pt={10}>
      <Paper component="form"  elevation={16} onSubmit={handleSubmit}>
      <FormTitle variant="h4">Create Post</FormTitle>
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
          <QuillContainer item xs={12}>
            <div ref={quillRef}/>
              <CustomError variant="subtitle1" color="error">{errors.message ? errors.message : ""}</CustomError>
          </QuillContainer>
          <FileBaseContainer item>
           <ImageCard 
            component="img"
            image={prevImg ? URL.createObjectURL(prevImg) : ""}
           />
           <input type="file" onChange={handleImage} />
            <CustomError variant="subtitle1" color="error">{!imgData ? "*Required" : ""}</CustomError>
          </FileBaseContainer>
        </Grid>
        <Grid container>
          <Grid item pl={5} pb={3}>
            <SubmitBtn type="submit">Submit</SubmitBtn>
          </Grid>
        </Grid>
      </Paper>
    </RootContainer>
  )
}

export default Form;