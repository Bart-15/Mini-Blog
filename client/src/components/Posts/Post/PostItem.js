import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getPost, deletePost} from '../../../store/actions/postActions';
import {Container, CardMedia} from '@mui/material';
import {useParams} from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import {
PostPaper, 
PostItemTitle, 
Author, 
HeadContainer, 
CreatedDate, 
ImageContainer, 
Image, 
DescriptionContainer,
ActionContainer,
DeleteButton,
EditButton
} from './styledPostItem';
import LoadingSpinner from '../../Spinner/LoadingSpinner';



import moment from 'moment'

const PostItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

   useEffect(() => {
    if(id) {
      dispatch(getPost(id, navigate));
    }
   }, [id])


   const {post, loading} = useSelector((state) => state.post);

   const htmlDescription = post.richText;

   const handleDelete = (id) => {
      dispatch(deletePost(id, navigate));
   }
   

  return (
    <Container>
        {(post === null || loading) ? <LoadingSpinner /> : (
          <>
            <PostPaper elevation={16} >
                <HeadContainer>
                    <PostItemTitle variant="h2">{post.title}</PostItemTitle>
                    <Author>Author: {post.author}</Author>
                    <CreatedDate>{moment(post.created_at).format('LL')}</CreatedDate>
                </HeadContainer>
                <ImageContainer>
                  <Image
                    component="img"
                    height="300"
                    image={`http://127.0.0.1:8000/${post.image}`}
                  />
                </ImageContainer>
                <DescriptionContainer component="div" dangerouslySetInnerHTML={{ __html: htmlDescription }} >
                </DescriptionContainer>
                <ActionContainer>
                  <DeleteButton type="button" onClick={() => handleDelete(id)}>Delete</DeleteButton>
                  <Link to={`/edit/${post.id}`}>
                    <EditButton>
                      Edit
                    </EditButton>
                  </Link>
                </ActionContainer>
            </PostPaper>
          </>
        )}
    </Container>
  )
}

export default PostItem;