
import { runUI, addEmployeeUI, openTab, searchEmployeeUI }
	from './employees/ui-all';
import {Employee} from './employees/model/Employee';
import './style.css';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;

runUI();

if (module.hot) {

	module.hot.dispose(function (data) {
		// Очистка слушателей и передача данных data
		// в обновленный модуль
		data.info = "some info";
	});

	module.hot.accept();
}