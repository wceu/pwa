import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import MenuNotifications from './MenuNotifications';
import MenuLinks from './MenuLinks';

const Menu = ({ isOpen, close }) =>
  isOpen ? (
    <Container>
      <Overlay onClick={close} onTouchMove={close} />
      <InnerContainer>
        <MenuHeader />
        <MenuList />
        <MenuNotifications />
        <MenuLinks />
      </InnerContainer>
    </Container>
  ) : null;

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  isOpen: theme.menu.isOpen,
  close: theme.menu.close,
}))(Menu);

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.color.text};
  z-index: 100;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.5;
`;

const InnerContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
`;
