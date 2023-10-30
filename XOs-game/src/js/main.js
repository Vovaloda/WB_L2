//Получение нужных элементов страницы

const ceilArray = document.querySelectorAll('.ceil');

const gameText = document.querySelector('.game__text h2');

const pveEasyTypeButton = document.querySelector('.pve-easy');
const pvpTypeButton = document.querySelector('.pvp');
const pveHardTypeButton = document.querySelector('.pve-hard');
const restartButton = document.querySelector('.restart');

//Установка значений по умолчанию
let gameData = {
    move: 1, 
    turn: 'X',
    boardData: [null, null, null, 
                null, null, null, 
                null, null, null],
    type: 'pve-easy',
    isWin: false,
}

//При нажатии на кнопки, запускает новую игру и устанавливает кнопку в активное положение
pveEasyTypeButton.addEventListener('click', ()=>{
    gameData.type = 'pve-easy';
    pveEasyTypeButton.classList.add('choosen-button');
    pvpTypeButton.classList.remove('choosen-button');
    pveHardTypeButton.classList.remove('choosen-button');
    newGameStart();
});

pvpTypeButton.addEventListener('click', ()=>{
    gameData.type = 'pvp';
    pveEasyTypeButton.classList.remove('choosen-button');
    pvpTypeButton.classList.add('choosen-button');
    pveHardTypeButton.classList.remove('choosen-button');
    newGameStart();
});

pveHardTypeButton.addEventListener('click', ()=>{
    gameData.type = 'pve-hard';
    pveEasyTypeButton.classList.remove('choosen-button');
    pvpTypeButton.classList.remove('choosen-button');
    pveHardTypeButton.classList.add('choosen-button');
    newGameStart();
});

//Перезапускает игру
restartButton.addEventListener('click', ()=>{
    newGameStart();
});

//Для всех ячеек добавляет ивент по нажатии 
ceilArray.forEach((el, id)=>{
    el.addEventListener('click', () => clickCeilAction(el, id));
});

function disabledAllCeil(){ // Функция дял отключения кликабельности всех кнопок 
    ceilArray.forEach(el =>{
        el.disabled = true;
    });
}