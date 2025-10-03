
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');


let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;


function updateDisplay() {
    display.value = currentInput;
}


function calculate(op, first, second) {
    first = parseFloat(first);
    second = parseFloat(second);
    if (isNaN(first) || isNaN(second)) return second;

    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            
            if (second === 0) {
                alert("¡No se puede dividir por cero!");
                return NaN;
            }
            return first / second;
        default:
            return second;
    }
}


function inputNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
}


function handleOperator(nextOperator) {
    const inputValue = currentInput;

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(operator, firstOperand, inputValue);
        currentInput = `${parseFloat(result.toFixed(7))}`; 
        firstOperand = currentInput;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}


function resetCalculator() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.classList.contains('number')) {
            inputNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('equals')) {
            handleOperator(operator); 
            operator = null;
            waitingForSecondOperand = true;
            firstOperand = null;
        } else if (button.classList.contains('clear')) {
            resetCalculator();
        }

        updateDisplay();
    });
});


updateDisplay();