import {styled} from '@mui/material';
import {Typography, Paper, Box, CardMedia, Button, Badge} from '@mui/material';


export const HeadContainer = styled(Box)`
    padding: 20px 40px;
`

export const PostItemTitle = styled(Typography)`
    font-size:30px;
    padding:5px 0;
`

export const PostPaper = styled(Paper)`
    margin:50px 20px;
`
export const Author = styled(Typography)`
    font-size:16px;
    margin:0 0 10px;
`

export const CreatedDate = styled(Badge)`
    font-size:14px;
    background:#de8116;
    padding:5px 10px;
    border-radius:50px;
    color:#fff;
    font-weight:bold;
`

export const ImageContainer = styled(Box)`
   display:flex;
   justify-content:start;
   align-items:center;
   margin:10px 40px;
   width:500px;
`

export const Image = styled(CardMedia)`
    border-radius:10px;
    box-shadow: -1px 1px 20px 0px rgba(0,0,0,0.75);
`

export const DescriptionContainer = styled(Box)`
   padding:0 40px;
   max-width: 100%;
`

export const ActionContainer = styled(Box)`
   padding:10px 0 30px 40px;

    a {
        text-decoration:none;
    }
`

export const DeleteButton =  styled(Button)`
    color:#f53a25;
    border: 1px solid #f53a25;
    padding:10px 30px;
    margin:0 10px 0 0;
    border-radius:50px;
    font-weight:bold;


`

export const EditButton = styled(Button)`
    color:#fff;
    background: #2dba63;
    padding:10px 30px;
    border-radius:50px;
    font-weight:bold;
    

    :hover {
        color:#2dba63;
        background:#333; 
    }


`