//Получение нужных элементов
const addItemForm = document.querySelector('.form__add-item');

const setCalForm = document.querySelector('.form__set-cal');

const allDeleteButton = document.querySelector('.button-delete');

const inputSearch = document.querySelector('.input__search');
 
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

//Установка начальных значений
let dataFilter = '';

canvas.width = '200';
canvas.height = '200';

let data = [];

let dailyCal = 1500;
let currentCal = 0;

//Добавление эвента submit при добавлении элемента
addItemForm.addEventListener('submit', (e) =>{
    e.preventDefault(); //Отмена действий по умолчанию

    const inputItemName = document.querySelector('.input__item-name');
    const inputItemCal = document.querySelector('.input__item-cal');

    const regNum = /^\d+$/; //Регулярка для проверки на число

    //Оповещаем пользователя, если что-то введёно не так
    if(!regNum.test(inputItemCal.value)){
        alert('Калории могут быть только числом');
        return;
    }

    if(inputItemName.value === ''){
        alert('Введите название продукта');
        return;
    }

    let id = 0; //Переменная для айди предмета

    if(data.length > 0){ //Если длина массива предметов больше нуля, найдём максимальный айди и прибавим 1 
        id = data.reduce((max, el) => el.id > max ? el.id : max, data[0].id) + 1;
    }


    //Создаёт предмет на основе ввода
    const item = {
        id: id,
        name: inputItemName.value,
        cal: +inputItemCal.value
    };

    //Добавляем его в массив
    data.push(item);

    addItem(item); //рисуем в таблице

    onEditCurrentCal(currentCal + item.cal); //Меняем текущее значение калорий

    circleDiagramDraw(); //Рисуем диаграмму

    saveData(); //Сохраняем в локальное хранилище
    
});

//Ивент Submit при установке калорий
setCalForm.addEventListener('submit', (e) =>{
    e.preventDefault(); //Отмена действий по умолчанию

    const inputDailyCal = document.querySelector('.input__daily-cal');

    onEditDailyCal(inputDailyCal.value); //Изменение калорий
});

//При нажатии на кнопку удаления всех элементов
allDeleteButton.addEventListener('click', ()=>{
    data = []; //Очищаем массив
    onEditCurrentCal(0); //Изменяем калории

    tableGenerate(); //Перерисовываем таблицу
});

//Сортировка по калориям
function sortByCal(){ 
    data = data.sort((el1, el2)=>{
        return el1.cal - el2.cal;
    });

    tableGenerate(); //Перерисовываем таблицу
}

//При изменении инпута поиска
inputSearch.addEventListener('input', ()=>{
    dataFilter = inputSearch.value; //Изменяем значение

    tableGenerate(); //Перерисовываем таблицу
});
