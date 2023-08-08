import { Component } from '@angular/core';

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent {
	displayValue: string = '0';
	currentExpression: string = '';
	waitingForNextOperand: boolean = false;

	onButtonClick(value: string|number) {
		if (value === '=') {
			this.calculate();
		} else if (value === 'DEL') {
			this.deleteLastCharacter();
		} else {
			if (this.displayValue === '0') {
				this.displayValue = value.toString();
			} else {
				this.displayValue += value;
			}
			this.currentExpression += value;
		}
	}

	deleteLastCharacter() {
		if (this.displayValue.length > 0) {
			if (this.displayValue.length === 1) {
				this.displayValue = '0';
				this.currentExpression = '0';
			}
			this.displayValue = this.displayValue.slice(0, -1);
			this.currentExpression = this.currentExpression.slice(0, -1);
		}
	}

	calculate() {
		try {
			this.displayValue = eval(this.currentExpression).toFixed(2).toString();
			this.currentExpression = this.displayValue;
		} catch (error) {
			this.displayValue = 'Error';
			this.currentExpression = '0';
		}
	}

	clearDisplay() {
		this.displayValue = '0';
		this.currentExpression = '';
	}
}
