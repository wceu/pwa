import React from 'react';
import PropTypes from 'prop-types';
import CardsList from './CardsList';
import Page from '../Pages/Page';

const NowNext = ({ sessions }) =>
  sessions.some(s => s.type === 'page') ? (
    <Page entity={sessions[0].entity} />
  ) : (
    <CardsList sessions={sessions} />
  );

NowNext.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NowNext;
