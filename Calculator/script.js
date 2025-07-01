let display=document.getElementById("display");
let currentinput = '';
let operator = '';
let previousvalue = '';
let isResultDisplayed = false;
function appendToDisplay(value)
{
    if(isResultDisplayed)
    {
        display.value = '';
        isResultDisplayed = false;
    }
     if (['+', '-', '*', '/'].includes(value)) 
        {
                if (currentinput !== '' && operator !== '' && previousvalue !== '') {
                    calculate();
                }
                
                operator = value;
                previousvalue = currentinput;
                currentinput = '';
                display.value += value === '*' ? '×' : value;
                return;
            }
    currentinput += value;  
    display.value += value;
}

function calculate() 
{
     if (previousvalue === '' || currentinput === '' || operator === '') {
                return;
            }

            let result;
            const prev = parseFloat(previousvalue);
            const current = parseFloat(currentinput);

            if (isNaN(prev) || isNaN(current)) return;

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        display.value = 'Error';
                        resetCalculator();
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            // Round to avoid floating point precision issues
            result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
            
            display.value = result.toString();
            currentinput = result.toString();
            operator = '';
            previousvalue = '';
            isResultDisplayed = true;
}
   function clearDisplay() 
   {
            display.value = '';
            currentInput = '';
            operator = '';
            previousInput = '';
            isResultDisplayed = false;
        }

        function deleteLast() {
            if (display.value.length > 0) {
                let lastChar = display.value.slice(-1);
                display.value = display.value.slice(0, -1);
                
                if (['+', '-', '×', '/'].includes(lastChar)) {
                    operator = '';
                    currentinput = previousvalue;
                    previousvalue = '';
                } else {
                    currentinput = currentinput.slice(0, -1);
                }
            }
        }

        function resetCalculator() 
        {
            setTimeout(() => {
                clearDisplay();
            }, 1500);
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay('.');
            } else if (['+', '-', '*', '/'].includes(key)) {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });
