import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Icons from '../Icons/Menu';

const MenuLink = ({ name, url, closeMenu }) => {
  const Icon = Icons[name];

  return (
    <Container onClick={closeMenu}>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Icon size={32} />
      </Link>
    </Container>
  );
};

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  closeMenu: theme.menu.close,
}))(MenuLink);

const Container = styled.div`
  box-sizing: border-box;
`;

const Link = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  width: ${({ theme }) => theme.size.button};
  display: flex;
  justify-content: center;
  align-items: center;
`;
