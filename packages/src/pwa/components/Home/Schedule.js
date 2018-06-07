import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ScheduleList from './ScheduleList';

const Schedule = ({ options, selected, selectTrack }) => (
  <Container>
    <Select onChange={selectTrack} value={selected.name}>
      {options.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>
    <ScheduleList track={selected.id} />
  </Container>
);

Schedule.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.shape({}).isRequired,
  selectTrack: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  options: theme.schedule.tracks,
  selected: theme.schedule.selected,
  selectTrack: event => {
    theme.schedule.selectTrack(event.target.value);
  },
}))(Schedule);

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.padding.schedule};
`;

const Select = styled.select`
  height: 48px;
  width: calc(100vw - 48px);
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.color.grey};
  border-radius: 3px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.white};
  appearance: none;
  text-transform: uppercase;

  background-image: linear-gradient(45deg, transparent 50%, ${({ theme }) => theme.color.text} 50%),
    linear-gradient(135deg, ${({ theme }) => theme.color.text} 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1.2em + 2px), calc(100% - 15px) calc(1.2em + 2px),
    calc(100% - 2.5em) 0.75em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
  }
`;
