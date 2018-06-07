import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuIcon from './MenuIcon';

const MenuButton = ({ openMenu }) => (
  <Container onClick={openMenu}>
    <MenuIcon />
    <Label>Menu</Label>
  </Container>
);

MenuButton.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  openMenu: theme.menu.open,
}))(MenuButton);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ theme }) => theme.size.button};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 16px;
`;

const Label = styled.div`
  padding-top: 4px;
  font-size: 10px;
  line-height: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text};
`;
