window.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screen');
    const keys = document.querySelector('.keys');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    keys.addEventListener('click', (event) => {
        const key = event.target;
        const action = key.value;

        if (!key.matches('button')) return;

        if (isNumber(action)) {
            currentInput += action;
            screen.value = currentInput;
        }

        if (isOperator(action)) {
            if (currentInput === '' && previousInput !== '') {
                operator = action;
            } else if (currentInput !== '') {
                if (previousInput !== '') {
                    previousInput = calculate(previousInput, currentInput, operator);
                    screen.value = previousInput;
                } else {
                    previousInput = currentInput;
                }
                operator = action;
                currentInput = '';
            }
        }

        if (action === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                screen.value = currentInput;
            }
        }

        if (action === '=') {
            if (previousInput !== '' && currentInput !== '') {
                screen.value = calculate(previousInput, currentInput, operator);
                currentInput = '';
                previousInput = screen.value;
            }
        }

        if (action === 'all-clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            screen.value = '';
        }
    });

    function isNumber(key) {
        return /\d/.test(key);
    }

    function isOperator(key) {
        return key === '+' || key === '-' || key === '*' || key === '/';
    }

    function calculate(firstOperand, secondOperand, operator) {
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);

        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
});