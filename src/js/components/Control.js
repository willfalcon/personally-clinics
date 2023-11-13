import styled from 'styled-components';

const Control = styled.div`
  position: absolute;
  z-index: 4;
  display: flex;
  box-shadow: rgb(0 0 0 / 30%) 0 1px 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  inset: 20px 10px auto auto;
  button {
    background: rgb(249, 249, 249);
    opacity: 0.95;
    transition: background-color 0.16s ease-out 0s;
    cursor: pointer;
    border-width: 0px 0px 1px;
    border-top-style: initial;
    border-right-style: initial;
    border-bottom-style: solid;
    border-left-style: initial;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-left-color: initial;
    border-image: initial;
    height: 26px;
    width: 26px;
    background-position: 0px 0px;
    background-size: 26px 260px;
    outline: 0px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &[disabled] {
      cursor: initial;
    }
    :hover&:not([disabled]) {
      background: white;
      opacity: 1;
    }
  }
`;

export default Control;
