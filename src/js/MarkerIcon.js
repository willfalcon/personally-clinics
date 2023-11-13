import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import mobile from './icons/mobile_clinicfindericon.svg';
import school from './icons/school_clinicfindericon.svg';
import titlex from './icons/titleX_clinicfindericon.svg';

const MarkerIcon = ({ active, current, type, className }) => {
  switch (type) {
    case 'Mobile':
      return <Custom className={className} src={`${mobile}`} data={{ active, current }} />;
    case 'School':
      return <Custom className={className} src={`${school}`} data={{ active, current }} />;
    case 'Title X':
      return <Custom className={className} src={`${titlex}`} data={{ active, current }} />;
    default:
      return <Default className={className} data={{ active, current }} />;
  }
};

const IconStyles = css`
  width: ${({ data: { active } }) => (active ? '40px' : '35px')};
  height: ${({ data: { active } }) => (active ? '40px' : '35px')};
  transition: 0.16s ease-out 0s;
  * {
    transition: 0.16s ease-out 0s;
  }
`;

const Custom = styled.img`
  ${IconStyles}
  cursor: pointer;
`;
const Default = styled(IoLocationSharp)`
  /* width: 35px; */
  ${IconStyles}
  /* height: 35px; */
  color: #3fb1ce;
  color: ${({ data: { current, active } }) => (current ? 'red' : active ? darken(0.1, '#3fb1ce') : '#3fb1ce')};
  /* color: ${({ data: { active } }) => (active ? darken(0.1, '#3fb1ce') : '#3fb1ce')}; */

  ${({ data: { current } }) =>
    !current &&
    `
    :hover {
      cursor: pointer;
    
      path:first-child {
        fill: ${darken(0.1, '#3fb1ce')};
      }
      
    }
  `}
`;

export default MarkerIcon;
