import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-8 p-6 bg-gray-900 rounded-2xl shadow-2xl">
      <div className="mb-4">
        <h1 className="text-white text-xl font-bold text-center mb-4">מחשבון</h1>
        <div className="bg-black rounded-lg p-4 mb-4">
          <div 
            className="text-white text-right text-2xl font-mono overflow-hidden"
            style={{ direction: 'ltr' }}
          >
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* שורה ראשונה */}
        <button
          onClick={clear}
          className="col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          נקה
        </button>
        <button
          onClick={() => performOperation('÷')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          ÷
        </button>
        <button
          onClick={() => performOperation('×')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          ×
        </button>

        {/* שורה שנייה */}
        <button
          onClick={() => inputNumber(7)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          7
        </button>
        <button
          onClick={() => inputNumber(8)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          8
        </button>
        <button
          onClick={() => inputNumber(9)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          9
        </button>
        <button
          onClick={() => performOperation('-')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          -
        </button>

        {/* שורה שלישית */}
        <button
          onClick={() => inputNumber(4)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          4
        </button>
        <button
          onClick={() => inputNumber(5)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          5
        </button>
        <button
          onClick={() => inputNumber(6)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          6
        </button>
        <button
          onClick={() => performOperation('+')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          +
        </button>

        {/* שורה רביעית */}
        <button
          onClick={() => inputNumber(1)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          1
        </button>
        <button
          onClick={() => inputNumber(2)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          2
        </button>
        <button
          onClick={() => inputNumber(3)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          3
        </button>
        <button
          onClick={performEquals}
          className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          =
        </button>

        {/* שורה חמישית */}
        <button
          onClick={() => inputNumber(0)}
          className="col-span-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          .
        </button>
      </div>
    </div>
  );
}
