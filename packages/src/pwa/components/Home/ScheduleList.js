import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ScheduleItem from './ScheduleItem';
import FilterFavorites from './FilterFavorites';

const ScheduleList = ({
  firstDaySessions,
  secondDaySessions,
  firstDayColumns,
  secondDayColumns,
}) => (
  <Container>
    <InnerContainer>
      <SessionDay>Friday, June 15th</SessionDay>
      <FilterFavorites />
    </InnerContainer>
    <ScheduleWrapper>
      {firstDaySessions.map((session, index) => (
        <ScheduleItem
          key={session.id}
          position={index}
          session={session}
          columns={firstDayColumns}
          isSpecial={!session.hasSpeakers}
        />
      ))}
    </ScheduleWrapper>
    <InnerContainer>
      <SessionDay>Saturday, June 16th</SessionDay>
    </InnerContainer>
    <ScheduleWrapper>
      {secondDaySessions.map((session, index) => (
        <ScheduleItem
          key={session.id}
          position={index}
          session={session}
          columns={secondDayColumns}
          isSpecial={!session.hasSpeakers}
        />
      ))}
    </ScheduleWrapper>
  </Container>
);

ScheduleList.propTypes = {
  firstDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  secondDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  firstDayColumns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  secondDayColumns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export default inject(({ theme }, { track }) => ({
  firstDaySessions: theme.track(track).firstDaySessions,
  secondDaySessions: theme.track(track).secondDaySessions,
  firstDayColumns: theme
    .track(track)
    .firstDaySessions.filter(item => item.speakers.length !== 0)
    .map(({ type, id, page }) => [{ type, id, page }]),
  secondDayColumns: theme
    .track(track)
    .secondDaySessions.filter(item => item.speakers.length !== 0)
    .map(({ type, id, page }) => [{ type, id, page }]),
}))(ScheduleList);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: calc(100vw - 48px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const ScheduleWrapper = styled.div`
  width: 100%;
`;

const SessionDay = styled.h3`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.color.lightGreyText};
  align-self: flex-start;
  line-height: 20px;
`;
