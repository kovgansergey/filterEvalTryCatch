const filterByType = (type, ...values) => values.filter(value => typeof value === type),	/* фильтр каждого значения value по типу
			возвращает массив только со значениями, совпадающими с полученным типом */

	hideAllResponseBlocks = () => {	// функция, которая скрывает все блоки
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));	// получаем массив блоков с разными результатами
		responseBlocksArray.forEach(block => block.style.display = 'none');	// с помощью цикла скрываем каждый блок
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {	// функиця "показать результат"
		hideAllResponseBlocks();	// сначала вызываем функцию, которая скрывает все блоки
		document.querySelector(blockSelector).style.display = 'block';	// отображаем конкретный блок, по принятому селектору
		if (spanSelector) {			// провяряем, был ли принят селектор блока для сообщения
			document.querySelector(spanSelector).textContent = msgText;	// если принят - записываем в него принятое сообщение
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),	/* функция вывода сообщения о ошибке -
	вызывает функицю "показать результат" и передает блок, который нужно показать, сообщение, и селектор блока, куда вставить сообщение */

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),	/* функция вывода результата -
	вызывает функицю "показать результат" и передает блок, который нужно показать, сообщение, и селектор блока, куда вставить сообщение */

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),	/* функция вывода пустого результата -
			вызывает функицю "показать результат" и передает блок, который нужно показать */

	tryFilterByType = (type, values) => {	// функция фильтрации данных по типу
		try {	// перехват ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");	/* отправляем тип данных и данные в фильтр
			и полученный массив преобразуем в одну строку через запятую с пробелом */
			const alertMsg = (valuesArray.length) ?	// проверяем полученный массив, не пустой ли он
				`Данные с типом ${type}: ${valuesArray}` :	// если не пустой - заносим в переменную сообщение со значениями
				`Отсутствуют данные типа ${type}`;	// а если пустой - заносим в переменную сообщение, что данных нет
			showResults(alertMsg);	// полученное сообщение отправляем в функцию вывода результата
		} catch (e) {	// перехват ошибок в случае ошибки
			showError(`Ошибка: ${e}`);	// сообщение о ошибке отправляем в функцию вывода сообщения о ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку отправки формы

filterButton.addEventListener('click', e => { // вешаем на кнопку событие по клику мышкой
	const typeInput = document.querySelector('#type');	// получаем инпут с типом данных
	const dataInput = document.querySelector('#data');	// получаем инпут с данными

	if (dataInput.value === '') {	// условие, что содержимое инпута с данными не пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!');	// если пустое - выводим сообщение с предупреждением
		showNoResults();	// и вызываем функцию вывода пустого результата
	} else {	// если не пустое
		dataInput.setCustomValidity('');	// очищаем сообщение с предупреждением
		e.preventDefault();	// сбрасываем событие отправки формы по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());	/* и вызываем функцию фильтрации данных по типу,
			в которую передаем содержимое инпутов с типом данных и с данными */
	}
});

