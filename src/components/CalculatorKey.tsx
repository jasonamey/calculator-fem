import {e} from "mathjs";
import React, {useState} from "react";
import styled from "styled-components";

interface IKeyProps {
  item: string;
  isDisabled: boolean;
  keyFunction: Function;
}

const Key = ({item, isDisabled, keyFunction}: IKeyProps) => {
  const [isMoving, setIsMoving] = useState(false);

  const clickHandler = () => {
    keyFunction(item);
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 200);
  };
  if (item !== "RESET" && item !== "=") {
    if (item !== "DEL") {
      return (
        <SquareKey isMoving={isMoving}>
          <button onClick={clickHandler} disabled={isDisabled}>
            {item}
          </button>
        </SquareKey>
      );
    } else {
      return (
        <DelKey isMoving={isMoving}>
          <button
            className="word-class"
            onClick={clickHandler}
            disabled={isDisabled}
          >
            {item}
          </button>
        </DelKey>
      );
    }
  } else {
    if (item === "=") {
      return (
        <EqualsKey isMoving={isMoving}>
          <button onClick={clickHandler}>{item}</button>
        </EqualsKey>
      );
    } else {
      return (
        <ResetKey isMoving={isMoving}>
          <button className="word-class" onClick={clickHandler}>
            {item}
          </button>
        </ResetKey>
      );
    }
  }
};

const KeyWrapper = styled.div<{isMoving: boolean}>`
  border-radius: 8px;
  overflow: hidden;
  transition: 0.1s;
  .word-class {
    font-size: 18px;
    letter-spacing: 1px;
  }
  button {
    border: none;
    width: 100%;
    height: 100%;
    font-family: inherit;
    padding: 12px 10px 8px 10px;
    font-size: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    line-height: 1;
  }

  transform: ${(props) => (props.isMoving ? "translateY(5px)" : "none")};
`;

const SquareKey = styled(KeyWrapper)`
  box-shadow: 0 4px 0 0 ${({theme}) => theme.squareKeyShadow};
  box-shadow: ${(props) => props.isMoving && "none"};

  button {
    color: ${({theme}) => theme.squareKeyColor};
    background-color: ${({theme}) => theme.squareKeyBackgroundColor};
  }
`;

const DelKey = styled(KeyWrapper)`
  box-shadow: 0 4px 0 0 ${({theme}) => theme.deleteKeyShadow};
  box-shadow: ${(props) => props.isMoving && "none"};
  button {
    color: ${({theme}) => theme.deleteKeyColor};
    background-color: ${({theme}) => theme.deleteKeyBackgroundColor};
  }
`;
const ResetKey = styled(KeyWrapper)`
  grid-column: span 2;
  box-shadow: 0 4px 0 0 ${({theme}) => theme.resetKeyShadow};
  box-shadow: ${(props) => props.isMoving && "none"};
  button {
    color: ${({theme}) => theme.resetKeyColor};
    background-color: ${({theme}) => theme.resetKeyBackgroundColor};
  }
`;

const EqualsKey = styled(KeyWrapper)`
  grid-column: span 2;
  box-shadow: 0 4px 0 0 ${({theme}) => theme.equalsKeyShadow};
  box-shadow: ${(props) => props.isMoving && "none"};
  button {
    color: ${({theme}) => theme.equalsKeyColor};
    background-color: ${({theme}) => theme.equalsKeyBackgroundColor};
  }
`;

export default Key;
