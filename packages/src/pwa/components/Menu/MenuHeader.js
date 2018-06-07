import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import CloseIcon from '../CloseIcon';
import Logo from '../TopBar/Logo';

const MenuHeader = ({ close }) => (
  <Container>
    <InnerContainer>
      <Logo />
      <Title>Menu</Title>
    </InnerContainer>
    <CloseButton onClick={close}>
      <CloseIcon />
    </CloseButton>
  </Container>
);

MenuHeader.propTypes = {
  close: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  close: theme.menu.close,
}))(MenuHeader);

const Container = styled.div`
  height: ${({ theme }) => theme.size.button};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #e9e9e6;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.size.button};
`;

const Title = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  padding-left: 8px;
`;

const CloseButton = styled.div`
  width: ${({ theme }) => theme.size.button};
  display: flex;
  justify-content: center;
  align-items: center;
`;
