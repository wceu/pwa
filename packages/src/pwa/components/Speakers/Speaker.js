/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SessionCard from './SessionCard';
import Content from '../Content';
import { sessionsContext } from '../../contexts';

const Speaker = ({ name, content, sessions, src, srcSet }) => {
  const columns = sessions.map(({ type, id }) => [{ type, id }]);

  return (
    <Container>
      <Name>{name}</Name>
      <div>
        <Avatar>
          <Image alt="Speaker gravatar" src={src} srcSet={srcSet} />
        </Avatar>
        <Content content={content} padding={24} />
      </div>
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} context={sessionsContext(columns)} />
      ))}
    </Container>
  );
};

Speaker.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }, { item: { id } }) => {
  const { gravatar } = theme.speaker(id);
  const sizes = [
    { px: 88, ratio: 1 },
    { px: 132, ratio: 1.5 },
    { px: 176, ratio: 2 },
    { px: 220, ratio: 2.5 },
    { px: 264, ratio: 3 },
  ];

  return {
    name: theme.speaker(id).name,
    src: gravatar
      ? `https://www.gravatar.com/avatar/${gravatar}?d=retro&r=g&s=400`
      : `https://secure.gravatar.com/avatar/?d=mm&r=g&s=400`,
    srcSet: gravatar
      ? sizes
          .map(
            size =>
              `https://www.gravatar.com/avatar/${gravatar}?d=retro&r=g&s=${size.px} ${size.ratio}x`,
          )
          .join(', ')
      : sizes
          .map(size => `https://secure.gravatar.com/avatar/?d=mm&r=g&s=${size.px} ${size.ratio}x`)
          .join(', '),
    content: theme.speaker(id).entity.content,
    sessions: theme.speaker(id).sessions.peek(),
  };
})(Speaker);

const Container = styled.div`
  box-sizing: border-box;
  padding: 56px 0 72px 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Name = styled.h3`
  padding: 24px 24px 16px 24px;
  margin: 0;
  font-size: 22px;
  font-weight: normal;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  margin: 0 16px 12px 24px;
  float: left;
  box-shadow: 4px 4px 0 0 ${({ theme }) => theme.color.yellow};
  background: ${({ theme }) => theme.color.black};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
  filter: grayscale(100%);
`;
