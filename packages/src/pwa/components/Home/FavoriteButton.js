import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import EmptyStarIcon from 'react-icons/lib/fa/star-o';
import FullStarIcon from 'react-icons/lib/fa/star';

const FavoriteButton = ({ isFavorite, toggleFavorite, inSchedule }) => (
  <Container onClick={toggleFavorite} inSchedule={inSchedule} isFavorite={isFavorite}>
    {isFavorite ? <FullStarIcon size={18} /> : <EmptyStarIcon size={18} />}
  </Container>
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  inSchedule: PropTypes.bool.isRequired,
};

export default inject((_, { session, inSchedule }) => ({
  isFavorite: !!session.isFavorite,
  toggleFavorite: session.toggleFavorite,
  inSchedule: !!inSchedule,
}))(FavoriteButton);

const Container = styled.div`
  width: ${({ theme, inSchedule }) => (inSchedule ? '' : theme.size.cardHeader)};
  height: ${({ theme, inSchedule }) => (inSchedule ? '' : theme.size.cardHeader)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > svg {
    padding: ${({ inSchedule }) => (inSchedule ? '3px 0' : '11px')};
    color: ${({ theme, inSchedule, isFavorite }) => {
      if (inSchedule) return isFavorite ? theme.color.red : theme.color.darkGrey;
      return theme.color.white;
    }};
  }
`;
