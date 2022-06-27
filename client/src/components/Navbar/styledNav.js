import {styled} from '@mui/material';
import {Box, Typography, Button} from '@mui/material';


export const NavContainer = styled(Box)`
  overflow:hidden;
  height:88px;
  background:#1b1c1c;
  width: 100vw;
  color:#fff;
`

export const LinkContainer = styled(Box)`
  display:flex;
  justify-content:space-between;
  align-items:center;
  max-width:1300px;
  margin:0 auto;
`

export const Logo = styled(Typography)`
  display:flex;
  justify-content:start;
  align-items:center;
  height:88px;
  margin:0 20px;
  cursor:pointer;
  > a {
       color:#fff;
       text-decoration:none;
   }
`
export const MenuLinks = styled(Box)`
    color:#fff;
    margin:0 20px;
    transition: 3s;
    > a {
        text-decoration:none;
    }
    `
export const LinkButton = styled(Button)`
    color:#2dba63;
    background:#333;
    padding: 10px 40px;
    border-radius: 50px;
    font-weight: bold;
    margin:0 20px;
    letter-spacing:1px;

    :hover {
        background:#2dba63;
        color:#fff;
    }
`