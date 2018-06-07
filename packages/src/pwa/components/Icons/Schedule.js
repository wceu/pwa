import React from 'react';
import PropTypes from 'prop-types';
import Bullhorn from './Bullhorn';
import Comments from './Comments';
import Utensils from './Utensils';
import Users from './Users';

const Icon = ({ title, size, inCard }) => {
  if (title === 'Lunch') return <Utensils size={size} inCard={inCard} />;
  if (title === 'Open networking') return <Comments size={size} inCard={inCard} />;
  if (title === 'Registration opens') return <Users size={size} inCard={inCard} />;
  return <Bullhorn size={size} inCard={inCard} />;
};

Icon.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number,
  inCard: PropTypes.bool,
};

Icon.defaultProps = {
  size: 24,
  inCard: false,
};

export default Icon;
