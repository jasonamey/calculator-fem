import React from "react";
import styled from "styled-components";
import {operatorType, operandsType} from "../types";

interface IDisplayProps {
  operands: operandsType;
  operator: operatorType;
  flash: boolean;
}

function Display({operands, operator, flash}: IDisplayProps) {
  const {firstOperand, secondOperand} = operands;
  return (
    <Wrapper flash={flash}>
      <h2>{operator === "" ? firstOperand : secondOperand}</h2>
    </Wrapper>
  );
}

export default Display;

const Wrapper = styled.div<{flash: boolean}>`
  width: 100%;
  border-radius: 8px;
  background-color: ${({theme}) => theme.displayBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 26px;
  overflow: hidden;
  margin-bottom: 22px;
  animation-name: ${(props) => (props.flash ? "flash" : "none")};
  animation-duration: 0.1s;
  transition: all 0.5s linear;
  h2 {
    background-color: ${({theme}) => theme.displayBackgroundColor};
    height: auto;
    text-align: right;
    font-size: 42px;
    color: ${({theme}) => theme.displayColor};
    transition: all 0.5s linear;
  }
  @media screen and (max-width: 500px) {
    width: 90vw;
    height: 90px;
    font-size: 34px;
  }
  @keyframes flash {
    0%,
    50%,
    100% {
      opacity: 1;
    }
    25%,
    75% {
      opacity: 0;
    }
  }
`;
