import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from '../Link';
import { speakersContext } from '../../contexts';

const ScheduleItemSpeakers = ({ speakers }) => (
  <Speakers>
    {speakers.map(speaker => (
      <Link
        key={speaker.name}
        type={speaker.type}
        id={speaker.id}
        context={speakersContext(speakers.map(({ type, id, page }) => [{ type, id, page }]))}
      >
        <Speaker>{`${speaker.name}`}</Speaker>
      </Link>
    ))}
  </Speakers>
);

ScheduleItemSpeakers.propTypes = {
  speakers: PropTypes.shape({}).isRequired,
};

export default ScheduleItemSpeakers;

const Speakers = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.lightGreyText};
`;

const Speaker = styled.a`
  display: inline-block;
  line-height: 20px;
  color: ${({ theme }) => theme.color.lightGreyText};

  &:not(:last-child):after {
    content: ',';
    margin-right: 4px;
  }
`;
