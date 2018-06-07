import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Card from './Card';

const CardsList = ({ sessions }) => (
  <Container>
    {sessions.map(session => (
      <Card
        key={session.id}
        session={session}
        columns={sessions.map(({ type, id, page }) => [{ type, id, page }])}
        isFavorite={!!session.isFavorite}
        isSpecial={!session.hasSpeakers}
      />
    ))}
  </Container>
);

CardsList.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardsList;

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.padding.home};
`;
