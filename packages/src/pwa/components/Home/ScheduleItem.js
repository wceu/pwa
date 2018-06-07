import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';
import Title from './ScheduleItemTitle';
import Speakers from './ScheduleItemSpeakers';
import Icon from '../Icons/Schedule';

const ScheduleItem = ({ session, position, columns, isFavorite, isSpecial }) => (
  <Container position={position} isFavorite={isFavorite} isSpecial={isSpecial}>
    <Time>{session.startTime}</Time>
    <InnerContainer isSpecial={isSpecial}>
      {isSpecial && <Icon title={session.title} size={22} />}
      <Title
        type={session.type}
        id={session.id}
        title={session.title}
        columns={columns}
        isSpecial={isSpecial}
      />
      {!isSpecial && <Speakers speakers={session.speakers} />}
    </InnerContainer>
    {!isSpecial && <FavoriteButton session={session} inSchedule />}
  </Container>
);

ScheduleItem.propTypes = {
  session: PropTypes.shape({}).isRequired,
  position: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isSpecial: PropTypes.bool.isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
}))(ScheduleItem);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: ${({ theme }) => theme.padding.scheduleItem};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
  background-color: ${({ theme, isFavorite, isSpecial }) => {
    if (isFavorite) return theme.color.yellow;
    if (isSpecial) return theme.color.grey;
    return null;
  }};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.color.grey};
  }
`;

const Time = styled.div`
  font-size: 14px;
  flex-shrink: 0;
  line-height: 24px;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: ${({ isSpecial }) => (isSpecial ? 'row' : 'column')};
  align-items: flex-start;
  flex-grow: 1;
  padding: 0 8px;
`;
