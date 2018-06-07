import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from '../Link';
import { sessionsContext } from '../../contexts';

const ScheduleItemTitle = ({ type, id, title, columns, isSpecial }) =>
  isSpecial ? (
    <Title dangerouslySetInnerHTML={{ __html: title }} isSpecial={isSpecial} />
  ) : (
    <Link type={type} id={id} context={sessionsContext(columns)}>
      <AnchorTitle dangerouslySetInnerHTML={{ __html: title }} isSpecial={isSpecial} />
    </Link>
  );

ScheduleItemTitle.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  isSpecial: PropTypes.bool.isRequired,
};

export default ScheduleItemTitle;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.color.black} !important;
  line-height: 24px;
  text-transform: uppercase;
  margin-left: 8px;
`;

const AnchorTitle = styled(Title)`
  color: ${({ theme }) => theme.color.blue} !important;
  text-transform: none;
  margin-left: 0;
`.withComponent('a');
