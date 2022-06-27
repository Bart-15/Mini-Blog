import React, { useEffect} from 'react'
import {getAllPosts, deletePost} from '../../store/actions/postActions';
import {Container, Grid, Card, CardMedia, CardContent, CardActions, Button} from '@mui/material';
import {PostHeader, PostContainer, Author, PostTitle} from './styledPosts';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingSpinner from '../Spinner/LoadingSpinner';


const Posts = () => {
  const dispatch = useDispatch();
  const {posts, loading} = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])
  

  return (
    <Container>
      <PostHeader variant="h3">
        {(!posts.length) ? "No posts" : "All Posts"}
      </PostHeader>
      {(posts === null || loading) ? (<LoadingSpinner />) : 
      <Grid container spacing={4}>
        {
          posts.map((post) => {
            return (
              <PostContainer item xs={12} sm={6} lg={3} key={post.id} >
                <Card sx={{ width: 345, boxShadow: 3 }} style={{ border: "none", }} >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://127.0.0.1:8000/${post.image}`}
                  />
                  <CardContent>
                  <PostTitle>
                    <Link to={`/post/${post.id}`} style={{textDecoration:'none', color:'#333'}}>
                      {post.title}
                    </Link>
                  </PostTitle>
                  <Author>
                    {post.author}
                  </Author>
                  </CardContent>
                </Card>
              </PostContainer>
            )
          })
        }
      </Grid>  
      }
    </Container>
  )
}

export default Posts