/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';
import Title from './CardTitle';
import Speakers from './CardSpeakers';
import VenueLink from './VenueLink';
import Icon from '../Icons/Schedule';

const specialTracks = {
  'Opening remarks': 'Milky Way and Andromeda',
  'Closing remarks': 'Milky Way and Andromeda',
  Lunch: 'Lunch stations',
  'Open networking': 'Expo area',
};

const Card = ({ isFavorite, isSpecial, session, columns }) => (
  <Container isFavorite={isFavorite}>
    <Header isSpecial={isSpecial} track={session.tracks[0].name}>
      <Track>
        {isSpecial ? (
          <VenueLink name={specialTracks[session.title]} />
        ) : (
          <VenueLink trackId={session.tracks[0].id} />
        )}
      </Track>
      {!isSpecial && <FavoriteButton session={session} />}
    </Header>
    <Body>
      {isSpecial && <Icon size={40} title={session.title} inCard />}
      <InnerContainer>
        <Title
          type={session.type}
          id={session.id}
          title={session.title}
          columns={columns}
          isSpecial={isSpecial}
        />
        {!isSpecial && <Speakers speakers={session.speakers} />}
        <Time>{`${session.startTime}${session.endTime ? ` - ${session.endTime}` : ''}`}</Time>
      </InnerContainer>
    </Body>
  </Container>
);

Card.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  isSpecial: PropTypes.bool.isRequired,
  session: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
}))(Card);

const Container = styled.div`
  box-sizing: border-box;
  height: auto;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme, isFavorite }) =>
    isFavorite ? theme.color.grey : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey};
  border-radius: 3px;
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
`;

const InnerContainer = styled.div`
  flex-grow: 1;
`;

const Header = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.cardHeader};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, isSpecial, track }) => {
    if (isSpecial) return theme.color.grey;
    if (track === 'Milky Way Track') return theme.color.blue;
    if (track === 'Andromeda Track') return theme.color.red;
    return theme.color.yellow;
  }};
  color: ${({ theme, isSpecial, track }) => {
    if (!isSpecial && (track === 'Milky Way Track' || track === 'Andromeda Track'))
      return theme.color.whiteText;
    return theme.color.text;
  }};
  padding-left: 16px;
`;

const Track = styled.div`
  font-size: 14px;
  font-weight: lighter;
  text-transform: uppercase;

  a, a:visited {
    color: inherit;
  }
`;

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.padding.cardBody};
  display: flex;
  align-items: center;
`;

const Time = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.color.greyText};
`;
