import React, {useState} from "react";
import {evaluate} from "mathjs";
import {operatorType, operandsType} from "../types";
import Heading from "./Heading";
import Display from "./Display";
import Pad from "./Pad";
import styled from "styled-components";

const Calculator = () => {
  const [operands, setOperands] = useState<operandsType>({
    firstOperand: "0",
    secondOperand: "0",
  });
  const [operator, setOperator] = useState<operatorType>("");
  const [isFlashing, setIsFlashing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const calculateExpression = () => {
    console.log(`${operands.firstOperand}${operator}${operands.secondOperand}`);
    const result = evaluate(
      `${operands.firstOperand}${operator}${operands.secondOperand}`
    );
    setOperands({
      firstOperand: result.toString().slice(0, 13),
      secondOperand: "0",
    });
    if (result === Infinity) {
      setTimeout(() => {
        setOperands({
          firstOperand: "0",
          secondOperand: "0",
        });
      }, 2000);
    }
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 100);
    setOperator("");
  };

  const handleOperator = (operator: operatorType) => {
    operator = operator === "x" ? "*" : operator;
    setOperator(operator);
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 100);
  };

  const reset = () => {
    setOperands({firstOperand: "0", secondOperand: "0"});
    setOperator("");
  };

  const del = () => {
    const operandToDelete =
      operator.length > 0 ? "secondOperand" : "firstOperand";
    const updatedOperand =
      operands[operandToDelete].length === 1
        ? "0"
        : operands[operandToDelete].slice(0, -1);
    setOperands((prev) => {
      const newObj = {...prev};
      newObj[operandToDelete] = updatedOperand;
      return newObj;
    });
  };

  const addToOperand = (char: string) => {
    const operandToAddTo =
      operator.length > 0 ? "secondOperand" : "firstOperand";
    if (char === ".") {
      const operand = operands[operandToAddTo];
      if (operand.indexOf(".") === -1 && operand.length < 11) {
        setOperands((prev) => {
          const newObj = {...prev};
          const tempValue = newObj[operandToAddTo];
          newObj[operandToAddTo] = tempValue + char;
          return newObj;
        });
      }
    } else if (operands[operandToAddTo] === "0") {
      setOperands((prev) => {
        const newObj = {...prev};
        newObj[operandToAddTo] = char;
        return newObj;
      });
    } else {
      setOperands((prev) => {
        const newObj = {...prev};
        const tempValue = newObj[operandToAddTo];
        newObj[operandToAddTo] = tempValue + char;
        return newObj;
      });
    }
  };
  return (
    <CalculatorWrapper isShaking={isShaking}>
      <Heading />
      <Display operands={operands} operator={operator} flash={isFlashing} />
      <Pad
        del={del}
        reset={reset}
        handleOperator={handleOperator}
        addToOperand={addToOperand}
        operands={operands}
        operator={operator}
        calculateExpression={calculateExpression}
      />
    </CalculatorWrapper>
  );
};

const CalculatorWrapper = styled.div<{isShaking: boolean}>`
  width: 428px;
  animation-name: ${(props) => (props.isShaking ? "shake" : "none")};
  // animation-name: shake;
  animation-duration: 0.1s;
  @keyframes shake {
    0% {
      transform: translate(px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -1px) rotate(-1deg);
    }
    20% {
      transform: translate(-1px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(2px, 1px) rotate(0deg);
    }
    40% {
      transform: translate(0px, -0px) rotate(1deg);
    }
    50% {
      transform: translate(-0px, 1px) rotate(-1deg);
    }
    60% {
      transform: translate(-2px, 0px) rotate(0deg);
    }
    70% {
      transform: translate(2px, 0px) rotate(-1deg);
    }
    80% {
      transform: translate(0px, 0px) rotate(1deg);
    }
    90% {
      transform: translate(0px, 1px) rotate(0deg);
    }
    100% {
      transform: translate(0px, -1px) rotate(-1deg);
    }
  }
`;

export default Calculator;
