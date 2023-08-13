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
	pressedEqual: boolean = true;

	onButtonClick(value: string|number) {
		if (value === 'DEL') {
			this.deleteLastCharacter();
		} else {
			if (this.displayValue === "Error") {
				this.clearDisplay();
				this.displayValue = value.toString();
				this.currentExpression = this.displayValue;
			} else {
				if (this.pressedEqual) {
					this.displayValue = value.toString();
					this.currentExpression = this.displayValue;
					this.pressedEqual = false;
				} else {
					this.displayValue += value;
					this.currentExpression += value;
				}
			}
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
		if (this.displayValue === "Error" || this.displayValue === "0") {
			return;
		}

		if (!(this.displayValue.includes("+") ||
			this.displayValue.includes("-") ||
			this.displayValue.includes("*") ||
			this.displayValue.includes("/"))) {
			return;
		}


		try {
			let newRecord = this.displayValue + " = ";
			this.displayValue = eval(this.currentExpression).toFixed(2).toString();
			newRecord += this.displayValue;

			this.addToHistory(newRecord);

			this.currentExpression = this.displayValue;
			this.pressedEqual = true;
		} catch (error) {
			this.displayValue = 'Error';
			this.currentExpression = '';
		}
	}

	clearDisplay() {
		this.displayValue = '0';
		this.currentExpression = '';
	}

	addToHistory(newRecord: string) {
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
	}
}
