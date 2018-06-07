import React from 'react';
import styled from 'react-emotion';
import MenuLink from './MenuLink';

const links = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/WordCampEurope',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/wceurope',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/wceurope/',
  },
  {
    name: 'Hyperlink',
    url: 'https://2018.europe.wordcamp.org/',
  },
];

const MenuLinks = () => (
  <Container>
    {links.map(({ name, url }) => <MenuLink key={name} name={name} url={url} />)}
  </Container>
);

export default MenuLinks;

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  padding: 0 24px;
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  display: flex;
`;
