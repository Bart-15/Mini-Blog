import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddForm from './components/Form/AddForm';
import EditForm from './components/Form/EditForm';
import Posts from '../src/components/Posts/Posts';
import PostItem from '../src/components/Posts/Post/PostItem';
import {CssBaseline} from '@mui/material';
import Navbar from '../src/components/Navbar/Navbar';


function App() {

  return (
    <>
    <CssBaseline />
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/create" element={<AddForm/>}></Route>
        <Route path="/edit/:id" element={<EditForm/>}></Route>
        <Route path="/post/:id" element={<PostItem />}></Route>
      </Routes>
    </Router>
    </>  
  );
}

export default App;
