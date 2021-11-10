import {Person} from './Person';
import DATA from '../employees-json';

export function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}

window.allEmployees = function() {
    return jsonToEmployees(DATA.employees);
}

export class Employee extends Person {

	constructor(name, surname) {
	    super(name,surname);
    }

	static fromJSON(obj) {
		return Object.assign(new Employee(), obj)
	}

	set position(position) {
		this._position = position;
	}

	get position() {
		return this._position;
	}

	toString() {
        return super.toString() +
            (this.position?"Должность: "+this.position:"");
    }
}

window.Employee = Employee;