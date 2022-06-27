import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {Container} from '@mui/material';
import {SpinnerContainer} from './styledSpinner'

const LoadingSpinner = () => {
  return (
    <Container>
        <SpinnerContainer variant="div">
            <ClipLoader color={"#ed522b"} size={150} />
        </SpinnerContainer>
    </Container>
  )
}

export default LoadingSpinner;
