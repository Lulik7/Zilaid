class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewInput = false;
        this.display = document.getElementById('display');
        this.init();
    }

    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }

    updateDisplay() {
        this.display.value = this.currentInput;
    }

    setupEventListeners() {
        document.querySelector('.buttons').addEventListener('click', (event) => {
            if (!event.target.classList.contains('btn')) return;

            const buttonText = event.target.textContent;

            // When an "event" happens, we look at its "target", to see if it "contains" the mentioned class in its "classList".
            if (event.target.classList.contains('number')) {
                this.handleNumberInput(buttonText);
            } else if (event.target.classList.contains('decimal')) {
                this.handleDecimal();
            } else if (event.target.classList.contains('operator')) {
                this.handleOperator(buttonText);
            } else if (event.target.classList.contains('equals')) {
                this.calculate();
            } else if (event.target.classList.contains('clear')) {
                this.clear();
            }
        });
    }

    // '0' => 7.7293872
    // 789823749827
    handleNumberInput(number) {
        if (this.waitingForNewInput) {
            this.currentInput = number;
            this.waitingForNewInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;

            // if (currentInput === '0') {
            //     currentInput = number; // 7
            // } else {
            //     currentInput = this.currentInput + number; // 78
            // }
        }
        this.updateDisplay();
    }

    // '0.1'
    // 9.
    // 10 + 0.6
    handleDecimal() {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        } else if (!this.currentInput.includes('.')) {
            // '9' + '.' = '9.'
            this.currentInput += '.';
            // this.currentInput = this.currentInput + '.';
        }
        this.updateDisplay();
    }

    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const result = this.performCalculation();
            this.currentInput = `${result}`;
            this.previousInput = result;
        }

        this.waitingForNewInput = true;
        this.operator = nextOperator;
    }

    performCalculation() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) return 0;

        switch (this.operator) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                return current !== 0 ? prev / current : 0; // Basic division by zero protection
            default:
                return current;
        }
    }

    calculate() {
        if (this.operator && !this.waitingForNewInput) {
            const result = this.performCalculation();
            this.currentInput = `${result}`;
            this.previousInput = '';
            this.operator = null;
            this.waitingForNewInput = true;
            this.updateDisplay();
        }
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewInput = false;
        this.updateDisplay();
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
