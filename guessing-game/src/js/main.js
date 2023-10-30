//Поулчение элементов со страницы
const settingButton = document.querySelector('.setting-icon'); 
const restartButton = document.querySelector('.restart-icon');

const inputForm = document.querySelector('.input__form');
const guessingInput = document.querySelector('#guessing-input');

const mainText = document.querySelector('.main__text__h1');

const modalWindow = document.querySelector('.modal');
const modalBlock = document.querySelector('.modal__content');
const modalForm = document.querySelector('.settings');

const currentMovesBlock = document.querySelector('.moves-counter span');
const minNumberField = document.querySelector('.min-number');
const maxNumberField = document.querySelector('.max-number');

const minNumberInput = document.querySelector('#min-numer__input');
const maxNumberInput = document.querySelector('#max-numer__input');

//Установка начальных значений для игры
let currentNumber = 0;
let currentMoves = 0;
let maxNumber = 100;
let minNumber = 1;
let isWin = false;

//Определение стандартынх настроек в инпутах настроек
minNumberInput.value = minNumber;
maxNumberInput.value = maxNumber;

//Открытеи модального окна по нажатии на настройки
settingButton.addEventListener('click', ()=>{
    modalWindow.style.display = 'flex';
});

//Закрытие модального окна по нажатии на любое место, кроме модального окна
modalWindow.addEventListener('click', ()=>{
    modalWindow.style.display = 'none';
});

//Отмена всплытия в модальном окне
modalBlock.addEventListener('click', (e)=>{
    e.stopPropagation();
});

//Перезапуск игры при нажатии на пноку перезапуска
restartButton.addEventListener('click', ()=>{
    gameStart();
});

