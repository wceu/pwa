import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';
import Content from '../Content';
import Link from '../Link';
import VenueLink from '../Home/VenueLink';
import { speakersContext } from '../../contexts';

const Session = ({ session, title, content, speakers, trackId, time, hasSpeakers }) => {
  const columns = speakers.map(({ type, id }) => [{ type, id }]);
  return (
    <Container>
      <Header>
        {hasSpeakers && <FavoriteButton session={session} />}
        <Title dangerouslySetInnerHTML={{ __html: title }} />
      </Header>
      <Content content={content} padding={24} />
      <Card>
        <CardSection>
          <CardTitle>SPEAKER{speakers.length > 1 ? 'S' : ''}</CardTitle>
          <CardText>
            {speakers.map(({ entity, name }) => (
              <Link
                key={entity.id}
                type={entity.type}
                id={entity.id}
                context={speakersContext(columns)}
              >
                <SpeakerName>{name}</SpeakerName>
              </Link>
            ))}
          </CardText>
        </CardSection>
        <CardSection>
          <CardTitle>TRACK</CardTitle>
          <CardTextVenue>
            <VenueLink trackId={trackId} />
          </CardTextVenue>
        </CardSection>
        <CardSection>
          <CardTitle>TIME</CardTitle>
          <CardText>{time}</CardText>
        </CardSection>
      </Card>
    </Container>
  );
};

Session.propTypes = {
  session: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  speakers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trackId: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  hasSpeakers: PropTypes.bool.isRequired,
};

export default inject(({ theme }, { item }) => {
  const session = theme.sessionsMap.get(`${item.type}_${item.id}`);
  return {
    session,
    title: session.entity.title,
    content: session.entity.content,
    speakers: session.speakers.peek(),
    trackId: session.tracks[0].id,
    time: session.startTime,
    hasSpeakers: session.hasSpeakers,
  };
})(Session);

const Container = styled.div`
  box-sizing: border-box;
  padding: 80px 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  padding: 0 24px 8px 24px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.color.black};
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  margin: 0;
`;

const Card = styled.div`
  margin: 16px 24px 0 24px;
  padding: 16px;
  border-radius: 3px;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const CardSection = styled.div`
  padding-bottom: 16px;
  &:last-child {
    padding-bottom: 0;
  }
`;

const CardTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

const CardText = styled.div`
  font-size: 16px;
  line-height: 20px;
`;

const CardTextVenue = styled(CardText)`
  color: ${({ theme }) => theme.color.blue};
`;

const SpeakerName = styled.span`
  color: ${({ theme }) => theme.color.blue};

  &:not(:last-child):after {
    content: ',';
    margin-right: 4px;
  }
`;
