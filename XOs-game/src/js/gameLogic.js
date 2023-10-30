//Функция сохранения данных в локальное хранилище
function saveToLocalStorage(){
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

//Получение случайного игрока
function getRandomTurn(){
    return Math.floor(Math.random() * 2) === 1 ? 'X' : 'O';
}

//Функция начала новой игры
function newGameStart(){
    //Обнуляем все ячейки по содержимому, возможности нажать и стилям
    ceilArray.forEach(el => {
        el.classList.value = 'ceil';
        el.disabled = false;
        el.textContent = '';
    });

    //устанавливаем начальные параметры игры
    gameData.isWin = false;
    gameData.move = 1;
    gameData.boardData = [null, null, null, 
                          null, null, null, 
                          null, null, null];
    gameData.turn = getRandomTurn();
    if(gameData.turn === 'O' && gameData.type !== 'pvp'){
        gameData.type === 'pve-easy' ? easyBotMove() : hardBotMove();
    }
    gameText.textContent = 'ХОД: ' +  gameData.turn;
    saveToLocalStorage(); //Сохраняем в локальное храниоище
}

//Функция для проверки, есть ли победитель и закрышивания выйграшной комбинации
function victoryCheckAndActions(){
    //Проверки по строчкам
    if(gameData.boardData[0] === gameData.boardData[1] && gameData.boardData[1] === gameData.boardData[2] && gameData.boardData[0]){
        ceilArray[0].classList.add('yellowgreen');
        ceilArray[1].classList.add('yellowgreen');
        ceilArray[2].classList.add('yellowgreen');
        return true;
    }
    if(gameData.boardData[3] === gameData.boardData[4] && gameData.boardData[4] === gameData.boardData[5] && gameData.boardData[5]){
        ceilArray[3].classList.add('yellowgreen');
        ceilArray[4].classList.add('yellowgreen');
        ceilArray[5].classList.add('yellowgreen');
        return true;
    }
    if(gameData.boardData[6] === gameData.boardData[7] && gameData.boardData[7] === gameData.boardData[8] && gameData.boardData[8]){
        ceilArray[6].classList.add('yellowgreen');
        ceilArray[7].classList.add('yellowgreen');
        ceilArray[8].classList.add('yellowgreen');
        return true;
    }

    //Проверки по столбикам
    if(gameData.boardData[0] === gameData.boardData[3] && gameData.boardData[3] === gameData.boardData[6] && gameData.boardData[6]){
        ceilArray[0].classList.add('yellowgreen');
        ceilArray[3].classList.add('yellowgreen');
        ceilArray[6].classList.add('yellowgreen');
        return true;
    }
    if(gameData.boardData[1] === gameData.boardData[4] && gameData.boardData[4] === gameData.boardData[7] && gameData.boardData[7]){
        ceilArray[1].classList.add('yellowgreen');
        ceilArray[4].classList.add('yellowgreen');
        ceilArray[7].classList.add('yellowgreen');
        return true;
    }
    if(gameData.boardData[2] === gameData.boardData[5] && gameData.boardData[5] === gameData.boardData[8] && gameData.boardData[8]){
        ceilArray[2].classList.add('yellowgreen');
        ceilArray[5].classList.add('yellowgreen');
        ceilArray[8].classList.add('yellowgreen');
        return true;
    }

    //Проверки по диагонали
    if(gameData.boardData[0] === gameData.boardData[4] && gameData.boardData[4] === gameData.boardData[8] && gameData.boardData[8]){
        ceilArray[0].classList.add('yellowgreen');
        ceilArray[4].classList.add('yellowgreen');
        ceilArray[8].classList.add('yellowgreen');
        return true;
    }
    if(gameData.boardData[2] === gameData.boardData[4] && gameData.boardData[4] === gameData.boardData[6] && gameData.boardData[6]){
        ceilArray[2].classList.add('yellowgreen');
        ceilArray[4].classList.add('yellowgreen');
        ceilArray[6].classList.add('yellowgreen');
        return true;
    }

    //Возвращает false, если нет победной комбинации
    return false;
}

function isDraw(){ //Функция для проверки на ничью
    if(gameData.move === 10 && !gameData.isWin){ //Если все ячейки заняты и нет победителя, уведомляем об этом пользователя
        return true;
    }
}

//Функция для действия с ячейкой (принимает id ячейки)
function ceilAction(id){
    const isXTurn = gameData.turn === 'X'; //Проверка, ходит ли 'X'
    
    //Добавляем стили, добавляем содержимое для ячейки и меняем параметры 
    ceilArray[id].textContent = gameData.turn;
    ceilArray[id].classList.add(isXTurn ? 'redX' : 'blueO');
    ceilArray[id].disabled = true;
    gameData.move++;
    gameData.boardData[id] = isXTurn ? 1 : 2;

    gameData.turn = isXTurn ? 'O' : 'X';

    gameText.textContent = 'ХОД: ' +  gameData.turn;

    gameData.isWin = victoryCheckAndActions(); //Проверяем, есть ли победитель

    saveToLocalStorage(); //Сохраняем в локальное хранилище данные

        if(gameData.isWin){ //Если есть победитель, уведомляем об этом и блокируем оставшиеся свободные ячейки
            gameText.textContent = 'ПОБЕДИЛ: ' + (isXTurn ? 'X' : 'O');
            disabledAllCeil();
            return;
        }

        if(isDraw()){ //Если все ячейки заняты и нет победителя, уведомляем об этом пользователя
            gameText.textContent = 'НИЧЬЯ';
            return;
        }
}

//Функция при клике на ячейку
function clickCeilAction(el, id){ 
    if(gameData.turn === 'X' || gameData.type === 'pvp'){ //Проверяем, может ли пользователь сейчас ходить
        //Отправляем инфомрацию о ячейку в функцию с действиями по ячейки
        ceilAction(id);

        gameData.isWin = victoryCheckAndActions(); //Проверка победителя

        const isXTurn = gameData.turn === 'X'; //Проверка на то, чей ход

        saveToLocalStorage(); //Сохранение данных

        if(gameData.isWin){ //Если есть победитель, уведомляем об этом и блокируем незанятые ячейки
            gameText.textContent = 'ПОБЕДИЛ: ' + (isXTurn ? 'O' : 'X');
            disabledAllCeil();
            return;
        }

        if(isDraw()){ //Если нет победителя, а все ячейки заняты, уведомляем пользователя
            gameText.textContent = 'НИЧЬЯ';
            return;
        }

        if(gameData.type === 'pve-easy'){ //Если тип PVP-лёгкое, даём сходить боту( с небольшой задержкой для имитации обдумывания хода)
            setTimeout(() => easyBotMove(), 500);
        }else if(gameData.type === 'pve-hard'){ //Если тип PVP-сложное, даём сходить боту( с небольшой задержкой для имитации обдумывания хода)
            setTimeout(() => hardBotMove(), 500);
        }
    }
}