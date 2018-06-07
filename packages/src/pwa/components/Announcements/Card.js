import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import Media from '../Media';
import Link from '../Link';
import { formatDate } from '../../utils';

const Card = ({ type, id, title, creationDate, authorName, featured, context }) => (
  <Link type={type} id={id} context={context}>
    <Container>
      <Media entity={featured} isRounded />
      <Title>{title}</Title>
      <Info>
        <Fecha>{creationDate}</Fecha>
        <Dash>―</Dash>
        <Author>{authorName}</Author>
      </Info>
    </Container>
  </Link>
);

Card.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  featured: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default inject((_, { entity }) => ({
  type: entity.type,
  id: entity.id,
  title: entity.title,
  creationDate: formatDate(new Date(entity.creationDate), 'MMMM Do'),
  authorName: entity.author.name,
  featured: entity.media.featured,
}))(Card);

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 24px 16px 24px;
`;

const Title = styled.h2`
  width: 100%;
  margin: 0;
  padding-top: 8px;
  line-height: 24px;
  font-size: 20px;
  font-weight: normal;
  color: ${({ theme }) => theme.color.blue};
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const Fecha = styled.p`
  margin: 0;
`;

const Dash = styled.p`
  margin: 0;
  padding: 0 8px;
`;

const Author = styled.p`
  margin: 0;
`;
