import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from '../Link';
import { sessionsContext } from '../../contexts';

const CardTitle = ({ type, id, title, columns, isSpecial }) =>
  isSpecial ? (
    <Title dangerouslySetInnerHTML={{ __html: title }} isSpecial={isSpecial} />
  ) : (
    <Link type={type} id={id} context={sessionsContext(columns)}>
      <AnchorTitle dangerouslySetInnerHTML={{ __html: title }} isSpecial={isSpecial} />
    </Link>
  );

CardTitle.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  isSpecial: PropTypes.bool.isRequired,
};

export default CardTitle;

const Title = styled.h2`
  display: block;
  font-size: 20px;
  font-weight: normal;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.color.text};
  text-transform: uppercase;
  margin: 0;
`;

const AnchorTitle = styled(Title)`
  font-size: 16px;
  text-transform: none;
`.withComponent('a');
