import React from 'react';
import styled from 'react-emotion';
import MenuRoute from './MenuRoute';

const routes = ['schedule', 'venue-map', 'announcements', 'menus', 'code-of-conduct'];

const MenuList = () => (
  <Container>{routes.map(route => <MenuRoute key={route} name={route} />)}</Container>
);

export default MenuList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
