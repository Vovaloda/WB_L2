//Функция добавления элемента в таблицу
function addItem(item){
    //Если не проходит проверку по поиску(фильтрации), не отрисовываем
    if(item.name.toLowerCase().indexOf(dataFilter.toLowerCase()) < 0){
        return;
    }

    //Создание элементов для таблицы
    const tableContent = document.querySelector('tbody');

    const trTmp = document.createElement('tr');
    const tdNameTmp = document.createElement('td');
    const tdCalTmp = document.createElement('td');
    const tdDeleteTmp = document.createElement('td');
    const tdDeleteButtonTmp = document.createElement('button');

    tdDeleteTmp.classList.add('deleteRow');
    tdDeleteButtonTmp.classList.add('button-delete-row');
    
    tdNameTmp.textContent = item.name;
    tdCalTmp.textContent = item.cal;
    tdDeleteButtonTmp.textContent = 'Удалить продукт';

    //Ивент для создаваем кнопки по нажатии
    tdDeleteButtonTmp.addEventListener('click', (e)=>{
        data = data.filter(el => {
            //Изменяет массив так, чтобы в нём не было данного элемента
            if(el.id !== item.id){
                return true;
            }
            return false;
        });
        tableGenerate(); //Переотрисовывает таблицу
    });

    tdDeleteTmp.appendChild(tdDeleteButtonTmp);

    trTmp.appendChild(tdNameTmp);
    trTmp.appendChild(tdCalTmp);
    trTmp.appendChild(tdDeleteTmp);

    tableContent.appendChild(trTmp); //Добавление элемента в таблицу
}

//Функция отрисовки таблицы
function tableGenerate(){
    const tableContent = document.querySelector('tbody');

    tableContent.innerHTML = '<tr><th>ПРОДУКТ</th><th>КАЛОРИЙНОСТЬ</th><th></th></tr>'; //Шапка таблицы

    const thsEls = document.querySelectorAll('th');

    thsEls[1].style.cursor = 'pointer'; //Изменение курсора для кликабельного элемента

    //При нажатии на этот элемент, сортирует таблицу
    thsEls[1].addEventListener('click', ()=>{
        sortByCal();
    });

    //Установка калорий на 0
    onEditCurrentCal(0);

    //Для каждого элемента массива со значениями
    data.forEach(el => {
        addItem(el); //Добавляем элемент массива в таблицу
        onEditCurrentCal(currentCal + el.cal); //Изменяем количество калорий
    }); 

    circleDiagramDraw(); //Перерисовывам круговую диаграмму 
    saveData(); //Сохраняем данные в локальное хранилище 
}