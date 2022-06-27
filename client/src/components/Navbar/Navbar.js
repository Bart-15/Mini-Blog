import React from 'react';
import {Link, useLocation } from 'react-router-dom'
import {NavContainer, LinkContainer, Logo, MenuLinks, LinkButton} from './styledNav';
const Navbar = () => {
    const location = useLocation();

  return (
    <NavContainer>
      <LinkContainer component="div">
          <Logo variant="h5">
            <Link to="/">
              LaReact :)
            </Link>
          </Logo>
       <MenuLinks component="div">
       {location.pathname === '/create' || (
        <Link to="/create">
         <LinkButton variant="h5">Create Post</LinkButton>
        </Link>
       )}
       </MenuLinks>
      </LinkContainer>
    </NavContainer>
  )
}

export default Navbar