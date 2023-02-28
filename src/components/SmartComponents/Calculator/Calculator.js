// import React, { useState, useEffect, useRef } from "react";
// import { CalculatorKey } from "../../DumbComponents/CalculatorKey/CalculatorKey";
// import { CalculatorDisplay } from "../../DumbComponents/CalculatorDisplay/CalculatorDisplay";
// import "./Calculator.css";

// const CalculatorOperations = {
//   '/': (prevValue, nextValue) => prevValue / nextValue,
//   '*': (prevValue, nextValue) => prevValue * nextValue,
//   '+': (prevValue, nextValue) => prevValue + nextValue,
//   '-': (prevValue, nextValue) => prevValue - nextValue,
//   '=': (prevValue, nextValue) => nextValue
// };

// export const Calculator = () => {
//   const [state, setState] = useState({
//     value: null,
//     displayValue: '0',
//     operator: null,
//     waitingForOperand: false
//   });
  
//   const clearAll = () => {
//     setState({
//       ...state, 
//       value: null,
//       displayValue: '0',
//       operator: null,
//       waitingForOperand: false
//     });
//   }
  
//   const clearDisplay = () => {
//     setState({
//       ...state, 
//       displayValue: '0'
//     });
//   }
  
//   const clearLastChar = () => {
//     const { displayValue } = state;
//     setState({
//       ...state,
//       displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
//     });
//   }
  
//   const toggleSign = () => {
//     const { displayValue } = state;
//     const newValue = parseFloat(displayValue) * -1;
  
//     setState({
//       ...state, 
//       displayValue: String(newValue)
//     });
//   }
  
//   const inputPercent = () => {
//     const { displayValue } = state
//     const currentValue = parseFloat(displayValue)
    
//     if (currentValue === 0)
//       return
    
//     const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
//     const newValue = parseFloat(displayValue) / 100
    
//     setState({
//       ...state, 
//       displayValue: String(newValue.toFixed(fixedDigits.length + 2))
//     });
//   }
  
//   const inputDot = () => {
//     const { displayValue } = state
    
//     if (!(/\./).test(displayValue)) {
//       setState({
//         ...state, 
//         displayValue: displayValue + '.',
//         waitingForOperand: false
//       })
//     }
//   }
  
//   const inputDigit = (digit) => {
//     const { displayValue, waitingForOperand } = state
//     if (waitingForOperand) {
//       setState({
//         ...state,
//         displayValue: String(digit),
//         waitingForOperand: false
//       })
//     } else {
//       setState({
//         ...state, 
//         displayValue: displayValue === '0' ? String(digit) : displayValue + digit
//       })
//     }
//   }
  
//   const performOperation = (nextOperator) => {
//     const { value, displayValue, operator } = state;
//     const inputValue = parseFloat(displayValue);
//     console.log('state', parseFloat(displayValue));
//     if (value == null) {
//       console.log('value null');
//       setState({
//         ...state, 
//         value: displayValue
//       })
//       console.log('value', state);
//     } else if (operator) {
//       const currentValue = value || 0
//       const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
//       setState({
//         ...state,
//         value: newValue,
//         displayValue: String(newValue)
//       })
//     }
    
//     setState({
//       ...state, 
//       waitingForOperand: true,
//       operator: nextOperator
//     })
//     console.log('state after', state);
//   }
  
//   const handleKeyDown = (event) => {
//     let { key } = event
    
//     if (key === 'Enter')
//       key = '='
    
//     if ((/\d/).test(key)) {
//       event.preventDefault()
//       inputDigit(parseInt(key, 10))
//     } else if (key in CalculatorOperations) {
//       event.preventDefault()
//       performOperation(key)
//     } else if (key === '.') {
//       event.preventDefault()
//       inputDot()
//     } else if (key === '%') {
//       event.preventDefault()
//       inputPercent()
//     } else if (key === 'Backspace') {
//       event.preventDefault()
//       clearLastChar()
//     } else if (key === 'Clear') {
//       event.preventDefault()
      
//       if (state.displayValue !== '0') {
//         clearDisplay()
//       } else {
//         clearAll()
//       }
//     }
//   };
  
//   useEffect(() => {
//     // const div = innerRef.current;
//     // subscribe event
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       // unsubscribe event
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
  
//   const { displayValue } = state
//   const clrDisplay = displayValue !== '0'
//   const clearText = clrDisplay ? 'C' : 'AC'

//   return (
//     <div className="calculator">
//       <CalculatorDisplay value={displayValue}/>
//       <div className="calculator-keypad">
//         <div className="input-keys">
//           <div className="function-keys">
//             <CalculatorKey className="key-clear" onPress={() => clrDisplay ? clearDisplay() : clearAll()}>{clearText}</CalculatorKey>
//             <CalculatorKey className="key-sign" onPress={() => toggleSign()}>±</CalculatorKey>
//             <CalculatorKey className="key-percent" onPress={() => inputPercent()}>%</CalculatorKey>
//           </div>
//           <div className="digit-keys">
//             <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>0</CalculatorKey>
//             <CalculatorKey className="key-dot" onPress={() => inputDot()}>●</CalculatorKey>
//             <CalculatorKey className="key-1" onPress={() => inputDigit(1)}>1</CalculatorKey>
//             <CalculatorKey className="key-2" onPress={() => inputDigit(2)}>2</CalculatorKey>
//             <CalculatorKey className="key-3" onPress={() => inputDigit(3)}>3</CalculatorKey>
//             <CalculatorKey className="key-4" onPress={() => inputDigit(4)}>4</CalculatorKey>
//             <CalculatorKey className="key-5" onPress={() => inputDigit(5)}>5</CalculatorKey>
//             <CalculatorKey className="key-6" onPress={() => inputDigit(6)}>6</CalculatorKey>
//             <CalculatorKey className="key-7" onPress={() => inputDigit(7)}>7</CalculatorKey>
//             <CalculatorKey className="key-8" onPress={() => inputDigit(8)}>8</CalculatorKey>
//             <CalculatorKey className="key-9" onPress={() => inputDigit(9)}>9</CalculatorKey>
//           </div>
//         </div>
//         <div className="operator-keys">
//           <CalculatorKey className="key-divide" onPress={() => performOperation('/')}>÷</CalculatorKey>
//           <CalculatorKey className="key-multiply" onPress={() => performOperation('*')}>×</CalculatorKey>
//           <CalculatorKey className="key-subtract" onPress={() => performOperation('-')}>−</CalculatorKey>
//           <CalculatorKey className="key-add" onPress={() => performOperation('+')}>+</CalculatorKey>
//           <CalculatorKey className="key-equals" onPress={() => performOperation('=')}>=</CalculatorKey>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import {CalculatorKey} from "../../DumbComponents/CalculatorKey/CalculatorKey";
import {CalculatorDisplay} from "../../DumbComponents/CalculatorDisplay/CalculatorDisplay";
import "./Calculator.css";

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  }
  
 export class Calculator extends React.Component {
    state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    };
    
    clearAll() {
      this.setState({
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      })
    }
  
    clearDisplay() {
      this.setState({
        displayValue: '0'
      })
    }
    
    clearLastChar() {
      const { displayValue } = this.state
      
      this.setState({
        displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
      })
    }
    
    toggleSign() {
      const { displayValue } = this.state
      const newValue = parseFloat(displayValue) * -1
      
      this.setState({
        displayValue: String(newValue)
      })
    }
    
    inputPercent() {
      const { displayValue } = this.state
      const currentValue = parseFloat(displayValue)
      
      if (currentValue === 0)
        return
      
      const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
      const newValue = parseFloat(displayValue) / 100
      
      this.setState({
        displayValue: String(newValue.toFixed(fixedDigits.length + 2))
      })
    }
    
    inputDot() {
      const { displayValue } = this.state
      
      if (!(/\./).test(displayValue)) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }
    
    inputDigit(digit) {
      const { displayValue, waitingForOperand } = this.state
      
      if (waitingForOperand) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setState({
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        })
      }

      console.log('state', this.state);
    }
    
    performOperation(nextOperator) {    
      const { value, displayValue, operator } = this.state
      const inputValue = parseFloat(displayValue)
      
      if (value == null) {
        this.setState({
          value: inputValue
        })
      } else if (operator) {
        const currentValue = value || 0
        const newValue = CalculatorOperations[operator](currentValue, inputValue)
        
        this.setState({
          value: newValue,
          displayValue: String(newValue)
        })
      }
      
      this.setState({
        waitingForOperand: true,
        operator: nextOperator
      })
    }
    
    handleKeyDown = (event) => {
      let { key } = event
      
      if (key === 'Enter')
        key = '='
      
      if ((/\d/).test(key)) {
        event.preventDefault()
        this.inputDigit(parseInt(key, 10))
      } else if (key in CalculatorOperations) {
        event.preventDefault()
        this.performOperation(key)
      } else if (key === '.') {
        event.preventDefault()
        this.inputDot()
      } else if (key === '%') {
        event.preventDefault()
        this.inputPercent()
      } else if (key === 'Backspace') {
        event.preventDefault()
        this.clearLastChar()
      } else if (key === 'Clear') {
        event.preventDefault()
        
        if (this.state.displayValue !== '0') {
          this.clearDisplay()
        } else {
          this.clearAll()
        }
      }
    };
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }
    
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown)
    }
    
    render() {
      const { displayValue } = this.state
      
      const clearDisplay = displayValue !== '0'
      const clearText = clearDisplay ? 'C' : 'AC'
      
      return (
        <div className="calculator">
          <CalculatorDisplay value={displayValue}/>
          <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                <CalculatorKey className="key-sign" onPress={() => this.toggleSign()}>±</CalculatorKey>
                <CalculatorKey className="key-percent" onPress={() => this.inputPercent()}>%</CalculatorKey>
              </div>
              <div className="digit-keys">
                <CalculatorKey className="key-0" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
                <CalculatorKey className="key-dot" onPress={() => this.inputDot()}>●</CalculatorKey>
                <CalculatorKey className="key-1" onPress={() => this.inputDigit(1)}>1</CalculatorKey>
                <CalculatorKey className="key-2" onPress={() => this.inputDigit(2)}>2</CalculatorKey>
                <CalculatorKey className="key-3" onPress={() => this.inputDigit(3)}>3</CalculatorKey>
                <CalculatorKey className="key-4" onPress={() => this.inputDigit(4)}>4</CalculatorKey>
                <CalculatorKey className="key-5" onPress={() => this.inputDigit(5)}>5</CalculatorKey>
                <CalculatorKey className="key-6" onPress={() => this.inputDigit(6)}>6</CalculatorKey>
                <CalculatorKey className="key-7" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
                <CalculatorKey className="key-8" onPress={() => this.inputDigit(8)}>8</CalculatorKey>
                <CalculatorKey className="key-9" onPress={() => this.inputDigit(9)}>9</CalculatorKey>
              </div>
            </div>
            <div className="operator-keys">
              <CalculatorKey className="key-divide" onPress={() => this.performOperation('/')}>÷</CalculatorKey>
              <CalculatorKey className="key-multiply" onPress={() => this.performOperation('*')}>×</CalculatorKey>
              <CalculatorKey className="key-subtract" onPress={() => this.performOperation('-')}>−</CalculatorKey>
              <CalculatorKey className="key-add" onPress={() => this.performOperation('+')}>+</CalculatorKey>
              <CalculatorKey className="key-equals" onPress={() => this.performOperation('=')}>=</CalculatorKey>
            </div>
          </div>
        </div>
      )
    }
  }