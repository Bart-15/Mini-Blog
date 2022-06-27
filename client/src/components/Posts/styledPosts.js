import {Typography, Grid, Badge} from '@mui/material';
import {styled} from '@mui/material';

export const PostHeader = styled(Typography)`
    padding:10px 0;
    color:#333;
`

export const PostContainer = styled(Grid)`
    display:flex;
    /* justify-content:center;
    align-items:center; */
`

export const Author = styled(Badge)`
   background:#2dba63;
   color:#fff;
   padding:5px 15px;
   font-size:12px;
   border-radius:50px;
   box-shadow:-3px 5px 15px -5px rgba(0,0,0,0.75);
;
`

export const PostTitle = styled(Typography)`
  font-size:16px;
  font-weight:bold;

  a > {
    text-decoration:none;
    color:#333;
  }
 
`