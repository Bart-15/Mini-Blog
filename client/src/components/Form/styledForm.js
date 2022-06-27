import {styled} from '@mui/material';
import {Typography, Container, Grid, Button, CardMedia} from '@mui/material';
import { style } from '@mui/system';

export const FormTitle = styled(Typography)`
    color:#333;
    text-align: center;
    padding-top: 20px;
`

export const RootContainer = styled(Container)`
    margin-top: 40px;
`

export const QuillContainer = styled(Grid)`
    height: 100%;
`
export const SubmitBtn = styled(Button)`
    color:#2dba63;
    background:#333;
    padding: 10px 40px;
    border-radius: 50px;
    font-weight: bold;

    :hover {
        background:#2dba63;
        color:#fff;
    }
`

export const FileBase = styled(Grid)`
    padding-top:10px;
`

export const CustomError = styled(Typography)`
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: left;
    margin-top: 3px;
    margin-right: 14px;
    margin-bottom: 0;
    margin-left: 14px;
`

export const ImageCard = styled(CardMedia)`
    width:250px;
`