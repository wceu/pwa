import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';

const routes = {
  'on-now': {
    id: 13,
    text: 'On Now',
  },
  'up-next': {
    id: 15,
    text: 'Up Next',
  },
  schedule: {
    id: 17,
    text: 'Full',
  },
};

const NavItem = ({ label, isSelected }) => (
  <Container isSelected={isSelected} label={label}>
    <Link type="page" id={routes[label].id}>
      <A isSelected={isSelected}>{routes[label].text}</A>
    </Link>
  </Container>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default inject(({ connection }, { label }) => ({
  isSelected: connection.selectedContext.getItem({ item: { type: 'page', id: routes[label].id } })
    .isSelected,
}))(NavItem);

const Container = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 33%;
  color: ${({ theme, isSelected }) => (isSelected ? theme.color.blue : '#7C7A69')};
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.color.white : null)}
  font-size: 16px;
  ${({ isSelected, theme }) =>
    isSelected ? null : `box-shadow: inset 0 0 0 1px ${theme.color.grey}`};
`;

const A = styled.a`
  width: 100%;
  height: ${({ theme }) => theme.size.button};
  color: ${({ theme, isSelected }) => (isSelected ? theme.color.blue : '#7C7A69')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
