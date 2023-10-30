//Функция загрузки игры
function loadGame(){
    const localStorageData = localStorage.getItem('gameData'); //Получение данных из локального хранилища
    if(!localStorageData){ //Если таких данных нету, запустить новую игру и сохранить данные в локальное хранилище
        newGameStart();
        localStorage.setItem('gameData', JSON.stringify(gameData));
        return;
    }

    gameData = JSON.parse(localStorageData); //Поулчение данных из локального хранилища в удобном формате

    //Установка нужной кнопки в активное положение
    if(gameData.type ==='pvp'){ 
        pveEasyTypeButton.classList.remove('choosen-button');
        pvpTypeButton.classList.add('choosen-button');
        pveHardTypeButton.classList.remove('choosen-button');
    }else if(gameData.type ==='pve-easy'){
        pveEasyTypeButton.classList.add('choosen-button');
        pvpTypeButton.classList.remove('choosen-button');
        pveHardTypeButton.classList.remove('choosen-button');
    }else if(gameData.type ==='pve-hard'){
        pveEasyTypeButton.classList.remove('choosen-button');
        pvpTypeButton.classList.remove('choosen-button');
        pveHardTypeButton.classList.add('choosen-button');
    }

    //Если ничья, сообщить об этом
    if(gameData.move === 10 && !gameData.isWin){
        gameText.textContent = 'НИЧЬЯ';
    }else if(gameData.isWin){ //Если кто-то победил, сообщить об этом и выключить нажатие ячеек
        gameText.textContent = 'ПОБЕДИЛ: ' + (gameData.turn === 'X' ? 'O' : 'X');
        victoryCheckAndActions();
        ceilArray.forEach(el =>{
            el.disabled = true;
        });
    }else{ //В остальных случаех, пишем, чей ход. Если ход бота, делаем этот ход
        gameText.textContent = 'ХОД: ' + gameData.turn;
        if(gameData.type ==='pve-hard' && gameData.turn === 'O'){
            hardBotMove();
        }
        if(gameData.type ==='pve-easy' && gameData.turn === 'O'){
            hardBotMove();
        }
    }

    ceilArray.forEach((el, id) =>{ //Всем занятым ячейкам устанавливаем стили и содержимое
        if(gameData.boardData[id]===2){
            el.classList.add('blueO');
            el.textContent = 'O';
            el.disabled = true;
        }else if(gameData.boardData[id]===1){
            el.classList.add('redX');
            el.textContent = 'X';
            el.disabled = true;
        }
    });
}

loadGame(); //Загрузка игры