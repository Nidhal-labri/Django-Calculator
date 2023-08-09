const keys = document.querySelector('.calculator-keys'),
      calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
      },
      display = document.querySelector('.calculator-screen');


updateScreen = () => {
  display.value = calculator.displayValue;
}

updateScreen();

keys.addEventListener('click', event => {
  const  target = event.target;
  const  value  = target.value;
  if (!target.matches('button')) {
    return;
  }



    switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
        handleOperator(value);
      break;
    case '.':
      addDecimal(value);
      break;
    case 'all-clear':
      calculatorReset();
      break;
    default:
      // check if the key is an integer
      //if (Number.isInteger(parseFloat(value))) {
        addDigit(value);
      }


  updateScreen();
});


   addDigit = digit => {
    const displayValue = calculator.displayValue,
        waitingForSecondOperand = calculator.waitingForSecondOperand;
    if (waitingForSecondOperand === true) {
      calculator.displayValue =  digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

  addDecimal = decimal => {

    if (calculator.waitingForSecondOperand === true) {

    	//calculator.displayValue = '0.'

      calculator.waitingForSecondOperand = false;

      return;

    }


    if (!calculator.displayValue.includes(decimal)) {
      calculator.displayValue += decimal;
    }
  }



handleOperator = nextOperator => {
  const firstOperand = calculator.firstOperand,
        displayValue = calculator.displayValue,
        operator  = calculator.operator;

  const inputValue = parseFloat(displayValue);


  if (operator && calculator.waitingForSecondOperand)  {

    calculator.operator = nextOperator;

    console.log(calculator);

    return;

  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(8))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
 console.log(calculator);
}

calculate = (firstOperand, secondOperand, operator) => {
  if (operator === '+'){
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*'){
    return firstOperand * secondOperand;
  } else if (operator === '/'){
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

calculatorReset = () => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;

}
