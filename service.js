function findByName(name, surname) {
    let res = [];
    for (var e of DATA.employees) {
        if ((!name || e.name===name) &&
            (!surname || e.surname===surname)) {
            res.push(e);
        }
    }
    return res;
}


function addEmployee(name, surname) {
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


function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id===id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}


function showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log("Информация о сотруднике "+employee["name"]+":");
    for (let key of keys) {
        console.log(key+ " = "+employee[key]);
    }
}


function showEmployees() {
    // альтернативный вариант:
    // DATA.employees.forEach(showEmployee);
    for (let e of DATA.employees) {
        showEmployee(e);
    }
}


const employeeMap = {};

function findById(id) {
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


function getAge(id) {
    const employee = findById(id);
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let ageDate = new Date(ageDiff); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function formatDate(date) {
    let day = date.getDate();
    if (day<10) day = '0'+day;
    let month = date.getMonth()+1;
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

function testEmployee() {
    addPhone(133, "555-55-55");
    addPhone(133, "666-66-66");
    setDateOfBirth(133, new Date(2000,1,1))
    const info = getEmployeeInfo(133);
    console.log(info);
}


function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

