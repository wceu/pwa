import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';

const SessionCard = ({ type, id, title, context }) => (
  <Link type={type} id={id} context={context} method="push">
    <Card>
      <Session>SESSION</Session>
      <Title dangerouslySetInnerHTML={{ __html: title }} />
    </Card>
  </Link>
);

SessionCard.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default inject((_, { session }) => ({
  type: session.type,
  id: session.id,
  title: session.title,
}))(SessionCard);

const Card = styled.div`
  margin: 16px 24px 0 24px;
  padding: 16px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const Session = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.blue};
`;
