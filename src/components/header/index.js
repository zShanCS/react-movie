import React from "react";
import { Link } from "react-router-dom";

import RMBDLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMBDLogoImg } from "./Header.styles";

const Header = () => (
  <Wrapper>
    <Content>
      <Link to='/'>
        <LogoImg src={RMBDLogo} alt='rmdb-logo' />
      </Link>

      <TMBDLogoImg src={TMDBLogo} alt='tmbd-logo' />
    </Content>
  </Wrapper>
);
export default Header;