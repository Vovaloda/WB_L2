//Получение нужных элементов на странице
const nextButton = document.querySelector('.next');
const backButton = document.querySelector('.back');
const stopButton = document.querySelector('.stop');
const continueButton = document.querySelector('.continue');

const radioSection = document.querySelector('.radio-section');
const personalArrayField = document.querySelector('.personal-array__field');
const chartContainerField = document.querySelector('.chart__container');

const mainBlock = document.querySelector('main');

const chartContainer = document.querySelector('.chart');

const textArea = document.querySelector('textarea');

let data = []; //Переменная для массива
let maxItem; //Переменная для максимального значения массива

let localPage = 0; //Переменная для локльного состояния меню

let delayMS = 1000; //Переменна для задержки в миллисекундах

let stopAnim = false; //Переменная для паузы анимации

const delay = async(ms) => await new Promise(resolve => setTimeout(resolve, ms)); //Искуственная задержка черех Промисы

function localPageRender(){ //Отрисовка нужной части меню в зависимости от значения, а также настройка параметров
    if(localPage === 0){

        backButton.disabled = true;

        mainBlock.style.opacity = 0;

        setTimeout(()=>{
            personalArrayField.style.display = 'flex';
            radioSection.style.display = 'none';
            mainBlock.style.opacity = 1;
        }, 300);
    }
    if(localPage === 1){

        delayMS = 0;

        if(!arrayCheck()){
            localPage--;
            localPageRender();
            return;
        }

        mainBlock.style.opacity = 0;
        nextButton.disabled = false;
        backButton.disabled = false;

        setTimeout(()=>{
            personalArrayField.style.display = 'none';
            radioSection.style.display = 'flex';
            chartContainerField.style.display = 'none';
            mainBlock.style.opacity = 1;
        }, 300);
    }
    if(localPage === 2){
        delayMS = 1000;
        inputRadioCheck();
        continueButton.disabled = true;
        stopAnim = false;
        mainBlock.style.opacity = 0;
        nextButton.disabled = true;

        setTimeout(()=>{
            radioSection.style.display = 'none';
            chartContainerField.style.display = 'flex';
            mainBlock.style.opacity = 1;
        }, 300);
    }
}

//Эвенты для кнопок Вперёд и назад по клику
nextButton.addEventListener('click', ()=>{
    localPage++;

    localPageRender();
});

backButton.addEventListener('click', ()=>{
    localPage--;
    
    localPageRender();
});

//Проверка массива
function arrayCheck(){
    if(textArea.value === ''){ //Если ничего не введено
        alert('Вы ничего не ввели');
        return false;
    }

    const textWithoutSpaces = textArea.value.replace(/\s/g, ""); //Убираем пробелы из строки

    const numberReg = /^\d+(,\d+)*$/; //Регулярка для проверки на формат '1,2,3'

    if(!numberReg.test(textWithoutSpaces)){
        alert('Неправильный формат. Формат: 1, 2, 3');
        return false;
    }

    data = textWithoutSpaces.split(','); //Перевод строки в массив

    let zeroCheck = true; //Переменная для првоерки наличия нулей в массиве
    data = data.map((el) => {
        el = +el; //Перевод строки в число
        if(el === 0){
            zeroCheck = false;
        }

        return +el;
    });

    if(!zeroCheck){
        alert('Каждый элемент должен быть больше 0');
        return false;
    }
    
    if(data.length > 100){
        alert('Слишком много элементов. Не вводите большее 100');
        return false;
    }

    if(data.length < 2){
        alert('Слишком мало элементов. Введите больше элементов');
        return false;
    }

    maxItem = Math.max.apply(null, data); //Поиск максимального значения массива

    return true;
}

//Проверка radio cheked
function inputRadioCheck(){ 
    generateChart(data); //Генерация столбцов

    const checkedInput = document.querySelector('input[name="radio"]:checked').value;

    //В заивисимости от radio вызываем функцию сортировки с небольшой задержкой
    if(checkedInput === 'bubble'){
        setTimeout(()=>bubbleSortVisualization(data),1000);
    }else if(checkedInput === 'insert'){
        setTimeout(()=>insertionSortVisualization(data),1000);
    }else if(checkedInput === 'quick'){
        setTimeout(()=>quickSortVisualization(data),1000);
    }else if(checkedInput === 'cycle'){
        setTimeout(()=>cycleSortVisualization(data),1000);
    }else if(checkedInput === 'selected'){
        setTimeout(()=>selectedSortVisualization(data),1000);
    }
}

//Ивенты для кнопок, связанных с анимацией 
stopButton.addEventListener('click', ()=>{
    stopAnim = true;
    delayMS = 0;
    setTimeout(()=>{
        continueButton.disabled = false;
        delayMS = 1000;
    },1000);
});

continueButton.addEventListener('click', ()=>{
    if(!stopAnim){
        return;
    }

    continueButton.disabled = true; 
    stopAnim = false;
    inputRadioCheck();
});
