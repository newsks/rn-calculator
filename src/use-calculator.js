import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState(0); //2
  const [currentOperator, setCurrentOperator] = useState(null); // +
  const [result, setResult] = useState(null); //12
  const [tempInput, setTempInput] = useState(null); //2
  const [tempOperator, setTempOperator] = useState(null); // +
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  // const hasInput = input? true:false
  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`); // good case
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      // =을 눌렀을때
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };
  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
