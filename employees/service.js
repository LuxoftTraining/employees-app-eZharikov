import DATA from './employees-json';

/**
 * Функция находит сотрудника по его имени.
 * В случае, если имя или фамилия пустые, они игнорируются.
 * Например, findByName("","") находит всех сотрудников.
 * findByName("Иван") находит всех Иванов.
 * fundByName(null,"Иванов") находит всех Ивановых
 *
 * @param name имя сотрудника
 * @param surname фамилия сотрудника
 * @returns {*} список сотрудников
 */
function findByName(name, surname) {
	for (var e of DATA.employees) {
		if ((!name || name.length==0 || e.name===name)
			&& (!surname || surname.length==0 || e.surname===surname)) {
			return e;
		}
	}
}

/**
 * Возвращает список всех сотрудников
 * @returns {*[]}
 */
export function getEmployees() {
	return DATA.employees;
}

/**
 * Функция добавляет сотрудника по имени.
 * id присваивается автоматически, как самый большой id+1.
 * В случае, если имя или фамилия не заданы, функция выбрасывает
 * исключение с сообщением об ошибке.
 *
 * @returns {number} id добавленного сотрудника
 */
export function addEmployee(name, surname) {
	if (!name || name.length==0 || !surname || surname.length==0) {
		throw new Error("name and surname should be not empty");
	}
	let max = 0;
	for (let e of DATA.employees) {
		if (e.id>max) max = e.id;
	}
	let id = max+1;
	DATA.employees.push({id,name,surname});
	return id;
}

/**
 * Функция удаляет сотрудника по id
 * @param id
 */
export function removeEmployee(id) {
	let index = 0;
	for (let e of DATA.employees) {
		if (e.id===id) break;
		index++;
	}
	DATA.employees.splice(index, 1);
}

/**
 * Показывает всю информацию по сотруднику employee.
 * Использует Object.keys для получения всех ключей объекта.
 * Выводит эту информацию в консоль (console.log)
 * в формате ключ=значение
 *
 * @param employee
 */
function showEmployee(employee) {
	const keys = Object.keys(employee);
	console.log("Информация о сотруднике "+employee["name"]+":");
	for (let key of keys) {
		console.log(key+ " = "+employee[key]);
	}
}

/**
 * Выводит в консоль информацию о всех сотрудниках,
 * вызывая showEmployee для каждого сотрудника.
 */
function showEmployees() {
	//DATA.employees.forEach(showEmployee);
	for (let e of DATA.employees) {
		showEmployee(e);
	}
}

const employeeMap = {};

export function findById(id) {
	if (employeeMap[id]) {
		return employeeMap[id];
	}
	for (var e of DATA.employees) {
		if (id==e.id) {
			employeeMap[id] = e;
			return e;
		}
	}
}

/**
 * Добавляет номер телефона.
 * Для этого используется свойство phones типа массив. 
 * Если такое свойство отвутствует, оно создается.
 * @param id
 */
function addPhone(id, phone) {
	const employee = findById(id);
	const phones = employee.phones;
	if (!phones) {
		employee.phones = [];
	}
	employee.phones.push(phone);
}

function setDateOfBirth(id, date) {
	const employee = findById(id);
	employee.dateOfBirth = date;
}

/**
 * Функция возвращает возраст сотрудника.
 * Принимает id сотрудника в качестве параметра.
 * Это решение вполне имеет смысл нагуглить.
 * Стоит отметить здесь, что в подобных случаях
 * не стоит изобретать велосипед.
 * @param id
 * @returns {number}
 */
function getAge(id) {
	const employee = findById(id);
	let ageDiff = Date.now() - employee.dateOfBirth.getTime();
	let ageDate = new Date(ageDiff); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date) {
	let day = date.getDate();
	if (day<10) day = '0'+day;
	let month = date.getMonth();
	if (month<10) month = '0'+month;
	let year = date.getFullYear();

	return day + '.' + month + '.' + year;
}

function getEmployeeInfo(id) {
	const e = findById(id);

	const phones = e.phones?
		`Список телефонов: ${e.phones}`:'';
	const age = e.dateOfBirth?
		`Возраст: ${getAge(e.id)}`:'';
	return ` 
		Имя: ${e.name}
		Фамилия: ${e.surname}
		Дата рождения: ${formatDate(e.dateOfBirth)}
		${phones} 
		${age}
	`;
}

function getEmployeeJSON(id) {
	const e = findById(id);
	return JSON.stringify(e);
}

function testEmployee() {
	addPhone(133, "555-55-55");
	addPhone(133, "666-66-66");
	setDateOfBirth(133, new Date(2000,1,1))
	const info = getEmployeeInfo(133);
	console.log(info);
}

export function setEmployeeManager(id, managerId) {
	const e = findById(id);
	e.managerRef = managerId;
}

export function searchEmployees(name, surname, managerRef) {
	let results = [];
	for (let e of DATA.employees) {
		if ((!name || e.name==name) &&
			(!surname || e.surname==surname) &&
			(!managerRef || e.managerRef==managerRef)) {
			results.push(e);
		}
	}
	return results;
}