import React from 'react';
import styled from 'react-emotion';

const CloseIcon = () => (
  <Container>
    <Svg
      width="12px"
      height="12px"
      viewBox="0 0 12 12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Sketch.</desc>
      <defs>
        <path
          d="M11.2499827,10.0000143 L15.312473,14.0625046 C15.3749729,14.1458379 15.4062228,14.2395877 15.4062228,14.3437539 C15.4062228,14.4479202 15.3749729,14.5312535 15.312473,14.5937534 L14.5937247,15.3125016 C14.5312249,15.3750015 14.4478916,15.4062514 14.3437253,15.4062514 C14.2395591,15.4062514 14.1458093,15.3750015 14.062476,15.3125016 L9.99998569,11.2500113 L5.93749538,15.3125016 C5.85416209,15.3750015 5.76041231,15.4062514 5.65624605,15.4062514 C5.55207979,15.4062514 5.4687465,15.3750015 5.40624665,15.3125016 L4.68749836,14.5937534 C4.62499851,14.5312535 4.59374858,14.4479202 4.59374858,14.3437539 C4.59374858,14.2395877 4.62499851,14.1458379 4.68749836,14.0625046 L8.74998868,10.0000143 L4.68749836,5.93752399 C4.62499851,5.8541907 4.59374858,5.76044092 4.59374858,5.65627466 C4.59374858,5.5521084 4.62499851,5.46877511 4.68749836,5.40627526 L5.40624665,4.68752697 C5.4687465,4.62502712 5.55207979,4.59377719 5.65624605,4.59377719 C5.76041231,4.59377719 5.85416209,4.62502712 5.93749538,4.68752697 L9.99998569,8.75001729 L14.062476,4.68752697 C14.1458093,4.62502712 14.2395591,4.59377719 14.3437253,4.59377719 C14.4478916,4.59377719 14.5312249,4.62502712 14.5937247,4.68752697 L15.312473,5.40627526 C15.3749729,5.46877511 15.4062228,5.5521084 15.4062228,5.65627466 C15.4062228,5.76044092 15.3749729,5.8541907 15.312473,5.93752399 L11.2499827,10.0000143 Z"
          id="path-1"
        />
      </defs>
      <g id="Screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Schedule-&gt;-Full-(Favorite)" transform="translate(-286.000000, -16.000000)">
          <g id="Header">
            <g id="Item" transform="translate(264.000000, 0.000000)">
              <g id="Icons/times" transform="translate(18.000000, 12.000000)">
                <mask id="mask-2" fill="white">
                  <use xlinkHref="#path-1" />
                </mask>
                <use
                  id="times"
                  fillOpacity="0.8"
                  fill="#282409"
                  fillRule="evenodd"
                  xlinkHref="#path-1"
                />
                <g id="Colors/Black" mask="url(#mask-2)" fill="#282409" fillRule="evenodd">
                  <g transform="translate(-11.000000, -12.000000)" id="Color">
                    <rect x="0" y="0" width="40" height="40" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </Svg>
    <Label>Close</Label>
  </Container>
);

export default CloseIcon;

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ theme }) => theme.size.button};
  height: ${({ theme }) => theme.size.button};
  padding: 14px 18px 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
`;

const Svg = styled.svg`
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  padding: 4px;
  padding-top: 2px;
`;

const Label = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  line-height: 10px;
`;
