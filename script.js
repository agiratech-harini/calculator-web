let currentDisplay = '0';
let operator = null;
let previousDisplay = null;
const display = document.getElementById('display');

function updateDisplay() {
  if (operator===null){
    display.innerText = currentDisplay;
  }else if(operator!== null && currentDisplay==='0'){
    display.innerText = previousDisplay +" "+operator;
  }else if(operator!== null && currentDisplay!=='0'){
    display.innerText = previousDisplay +" "+operator+" "+currentDisplay;
  }
  
}

function appendNumber(number) {
  if (currentDisplay === '0') {
    currentDisplay = number;
  } else {
    currentDisplay = currentDisplay + number;
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
    calculate();
    previousDisplay = currentDisplay;
    operator = op;
    currentDisplay = '0';
    updateDisplay();
  } else {
    operator = op;
    previousDisplay = currentDisplay;
    currentDisplay = '0';
    updateDisplay();
  }
}

function calculate() {
  if (operator === null || previousDisplay === null) return;

  const prev = parseFloat(previousDisplay);
  const current = parseFloat(currentDisplay);

  switch (operator) {
    case '+':
      currentDisplay = (prev + current).toString();
      break;
    case '-':
      currentDisplay = (prev - current).toString();
      break;
    case '*':
      currentDisplay = (prev * current).toString();
      break;
    case '/':
      currentDisplay = (prev / current).toString();
      break;
      case '%':
        currentDisplay = (prev % current).toString();
        break;
    default:
      return;
  }

  operator = null;
  previousDisplay = null;
  updateDisplay();
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