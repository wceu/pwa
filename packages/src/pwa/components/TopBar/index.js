import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Logo from './Logo';
import MenuButton from '../Menu/MenuButton';
import CloseButton from './CloseButton';

const TopBar = ({ contextTitle, contextName, contextColor }) => (
  <Container color={contextColor}>
    <InnerContainer>
      <Logo />
      <Title>{contextTitle}</Title>
    </InnerContainer>
    {['home', 'announcements'].includes(contextName) ? <MenuButton /> : <CloseButton />}
  </Container>
);

TopBar.propTypes = {
  contextName: PropTypes.string.isRequired,
  contextTitle: PropTypes.string.isRequired,
  contextColor: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  contextName: connection.selectedContext.options.name,
  contextTitle: connection.selectedContext.options.title,
  contextColor: connection.selectedContext.options.color,
}))(TopBar);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ theme }) => theme.size.button};
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background: ${({ theme, color }) => theme.color[color] || theme.color.grey};
  z-index: 10;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.size.button};
`;

const Title = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text};
  padding-left: 8px;
`;
