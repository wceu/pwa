import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Venue = ({ venue }) => (
  <Container>
    <Title>{venue.entity.title}</Title>
    <a href={venue.entity.media.featured.original.url}>
      <Image
        alt={venue.entity.media.featured.alt}
        src={venue.entity.media.featured.original.url}
        srcSet={venue.entity.media.featured.sizes
          .map(({ width, url }) => `${url} ${width}w`)
          .join(', ')}
      />
    </a>
  </Container>
);

Venue.propTypes = {
  venue: PropTypes.shape({}).isRequired,
};

export default Venue;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.venues};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 22px;
  margin: 0;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
`;
