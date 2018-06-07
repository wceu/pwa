import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FullStarIcon from 'react-icons/lib/fa/star';
import EmptyStarIcon from 'react-icons/lib/fa/star-o';

const FavoriteButton = ({ isFavorite, toggleFavorite }) => (
  <Container onClick={toggleFavorite} isFavorite={isFavorite}>
    {isFavorite ? <FullStarIcon size={28} /> : <EmptyStarIcon size={28} />}
  </Container>
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
  toggleFavorite: session.toggleFavorite,
}))(FavoriteButton);

const Container = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 0 8px 8px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > svg {
    color: ${({ theme, isFavorite }) => (isFavorite ? theme.color.yellow : theme.color.darkGrey)};
  }
`;
