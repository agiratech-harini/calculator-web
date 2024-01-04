let currentDisplay = '0';
let operator;
let previousDisplay = null;
const display = document.getElementById('display');
let firstOperand = null;
let waitForSecondOperand = false;
let readyToCalculate = false; 

function updateDisplay() {
  if (operator===null){
    display.innerText = currentDisplay;
  }else if(operator!== null && currentDisplay==='0'){
    display.innerText = display.innerText +" "+operator;
  }else if(operator!== null && currentDisplay!=='0'){
    display.innerText = display.innerText +" "+currentDisplay;
  }

}
function appendNumber(number) {
  if (currentDisplay === '0') {
    currentDisplay = number;
  } else {
    currentDisplay += currentDisplay + number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (!currentDisplay.includes('.')) {
    currentDisplay = currentDisplay + '.';
    updateDisplay();
  }
}

function setOperator(op) {
      if (operator !== null) {
        // calculate();
        previousDisplay = currentDisplay;
        operator = op;//op is a variable representing a new operator
        currentDisplay = '0';//after an operation is performed it will reset the current display to 0
        updateDisplay();
      } else {
        operator = op;
        previousDisplay = display.innerText;
        console.log(previousDisplay);
        currentDisplay = '0';
        updateDisplay();
      }
    }
    function clearDisplay() {
        currentDisplay = '0';
        operator = null;
        previousDisplay = null;
        updateDisplay();
      }
      function del(){
        if(currentDisplay<=9){
          display.innerText = 0;
        }
        else{
          let de = currentDisplay+"";
          let col = de.substring(0,de.length-1);
          currentDisplay = parseFloat(col);
          display.innerText = currentDisplay;
        }
      }
    
function calculate(){
    let postfix=infixToPostfix(document.getElementById("display").innerText)
    let result=evaluatePostfix(postfix)
    console.log(result)
    document.getElementById("display").innerText=result;
    
}
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2
  };
  
  function infixToPostfix(infix) {
    console.log(infix);
    const outputQueue = [];
    const operatorStack = [];
  
    const tokens = infix.match(/(\d+(\.\d+)?)|([+\-*/%])/g);
    console.log(tokens);
  
    if (!tokens) return '';
  
    tokens.forEach(token => {
      if (!isNaN(parseFloat(token))) {
        outputQueue.push(token);
      } else {
        while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });
    
    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }
  
    return outputQueue;
  }

  function evaluatePostfix(postfix) {
    console.log(postfix)
    const stack = [];
  
    const tokens = postfix;
    tokens.forEach(token => {
      if (!isNaN(parseFloat(token))) {
        stack.push(parseFloat(token));
      } else {
        const operand2 = stack.pop();
        const operand1 = stack.pop();
  
        switch (token) {
          case '+':
            stack.push(operand1 + operand2);
            // console.log("oper1"+operand1);
            // console.log(operand2);
            // console.log(stack)
            break;
          case '-':
            stack.push(operand1 - operand2);
            break;
          case '*':
            stack.push(operand1 * operand2);
            break;
          case '/':
            stack.push(operand1 / operand2);
            break;
          case '%':
            stack.push(operand1 % operand2);
            break;
          default:
            break;
        }
      }
    });
  
    return stack.pop();
  }
  