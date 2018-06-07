import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Switch from 'rc-switch';

const FilterFavorites = ({ isFiltered, toggleFilter }) => (
  <Container onClick={toggleFilter}>
    <Label>Only Favorites</Label>
    <SwitchWrapper>
      <Switch checked={isFiltered} />
    </SwitchWrapper>
  </Container>
);

FilterFavorites.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  isFiltered: theme.schedule.isFiltered,
  toggleFilter: theme.schedule.toggleFilter,
}))(FilterFavorites);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  margin-right: 8px;
  line-height: 20px;
`;

const SwitchWrapper = styled.span`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  .rc-switch {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 32px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    border-radius: 20px 20px;
    background-color: #e9e9e6;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);

    &:after {
      position: absolute;
      width: 12px;
      height: 12px;
      left: 4px;
      top: 4px;
      border-radius: 50% 50%;
      content: ' ';
      cursor: pointer;
      transition: left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      background: ${({ theme }) => theme.color.switch};
    }
    &:focus {
      outline: none;
    }
    &.rc-switch-checked span {
      left: 6px;
    }
    &.rc-switch-checked:after {
      left: 16px;
      background: ${({ theme }) => theme.color.red};
    }
    &.rc-switch-disabled {
      cursor: no-drop;
      background: #ccc;
      border-color: #ccc;
    }
    &.rc-switch-disabled:after {
      background: #9e9e9e;
      cursor: no-drop;
    }
  }
`;
