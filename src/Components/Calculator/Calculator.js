import React, {Component} from 'react';
import './Calculator.css'

class Calculator extends Component {

    constructor() {
        super();
        this.state = {
            result: 0,
            number1: 10,
            number2: 7,
            operation: '+'
        }
        this.showResult = this.showResult.bind(this)
    }

    showResult(operation, number1, number2) {
        let result = 0;
        switch (operation) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            default:
                break;
        }
        this.setState({result: result})
    }

    handleNumber1Change(e) {
        let number1 = +e.currentTarget.value;
        this.setState({number1: number1})
        let {number2, operation} = this.state
        this.showResult(operation, number1, number2)
    }

    handleNumber2Change(e) {
        let number2 = Number(e.currentTarget.value);
        this.setState({number2: number2})
        let {number1, operation} = this.state
        this.showResult(operation, number1, number2)
    }

    handleOperationChange(e) {
        this.setState({operation: e.currentTarget.value})
        let {number1, number2} = this.state
        this.showResult(e.currentTarget.value, number1, number2)
    }

    render() {
        return (
            <div className="calculator">
                <div>
                    <input value={this.state.number1} onChange={this.handleNumber1Change.bind(this)}/>
                </div>
                <div>
                    <select name="" id="" onChange={this.handleOperationChange.bind(this)}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </select>
                </div>
                <div>
                    <input value={this.state.number2} onChange={this.handleNumber2Change.bind(this)}/>
                </div>
                <div>
                    <button onClick={this.showResult}>Get Result</button>
                </div>
                <div>
                    Result
                    : <span>{this.state.number1} {this.state.operation} {this.state.number2} = {this.state.result}</span>
                </div>
            </div>
        );
    }
}

export default Calculator;
