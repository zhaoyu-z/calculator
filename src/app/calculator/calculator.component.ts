import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

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
			} else if (this.displayValue === "Error") {
				this.clearDisplay();
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
			let newRecord = this.displayValue + " = ";
			this.displayValue = eval(this.currentExpression).toFixed(2).toString();
			newRecord += this.displayValue;

			var newElement = document.createElement("div");
			newElement.innerHTML = newRecord;
			newElement.style.display = "flex";
			newElement.style.justifyContent = "space-between";
			newElement.style.fontSize = "20px";
			
			var historyContainer = document.getElementById("historyContainer");

			var deleteButton = document.createElement("button");
			deleteButton.innerHTML = "X";
			deleteButton.style.color = "green";
			deleteButton.addEventListener("click", () => {
				historyContainer?.removeChild(newElement);
			});
			
			if (historyContainer) {
				newElement.appendChild(deleteButton);
				historyContainer.appendChild(newElement);
			}

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
