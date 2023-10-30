//Функция хода лёгкого бота
function easyBotMove(){
    let randomFreeCeil = null; //Переменная для случайной позиции
    do{ //Пока не находим незанятую ячейку, выбираем случайную позицию
        randomFreeCeil = Math.floor(Math.random() * (9));
    }while(gameData.boardData[randomFreeCeil]);

    ceilAction(randomFreeCeil);
}

//Функция хода сложного бота
function hardBotMove(){
    if(gameData.move === 1){ //Если это первый ход, занимаем центр
        ceilAction(4);
        return;
    }
    if(gameData.move === 2){ //Если это второй ход, занимаем один из угловых элементов
        gameData.boardData[0] ? ceilAction(2) : ceilAction(0);
        return;
    }

    //Проверяем, есть ли где-нибудь 2 одинаковых занятых ячейки в какой-нибудь из строк. Если есть, занимаем оставшуюся
    for(let i = 0; i < 7; i+=3){
        if(gameData.boardData[i] === gameData.boardData[i + 1] && !gameData.boardData[i + 2] && gameData.boardData[i]){
            ceilAction(i+2);
            return;
        }
        if(gameData.boardData[i + 1] === gameData.boardData[i+2] && !gameData.boardData[i] && gameData.boardData[i+2]){
            ceilAction(i);
            return;
        }
        if(gameData.boardData[i] === gameData.boardData[i+2] && !gameData.boardData[i+1] && gameData.boardData[i+2]){
            ceilAction(i+1);
            return;
        }
    }

    //Проверяем, есть ли где-нибудь 2 одинаковых занятых ячейки в каком-нибудь из столбцов. Если есть, занимаем оставшуюся
    for(let i = 0; i < 3; i++){
        if(gameData.boardData[i] === gameData.boardData[i+3] && !gameData.boardData[i+6] && gameData.boardData[i]){
            ceilAction(i+6);
            return;
        }
        if(gameData.boardData[i] === gameData.boardData[i+6] && !gameData.boardData[i+3] && gameData.boardData[i]){
            ceilAction(i+3);
            return;
        }
        if(gameData.boardData[i+3] === gameData.boardData[i+6] && !gameData.boardData[i] && gameData.boardData[i+6]){
            ceilAction(i);
            return;
        }
    }

    //Проверяем, есть ли где-нибудь 2 одинаковых занятых ячейки в одной из диагоналей. Если есть, занимаем оставшуюся
    if(gameData.boardData[0] === gameData.boardData[4] && !gameData.boardData[8] && gameData.boardData[0]){
        ceilAction(8);
        return;
    }else if(gameData.boardData[0] === gameData.boardData[8] && !gameData.boardData[4] && gameData.boardData[0]){
        ceilAction(4);
        return;
    }else if(gameData.boardData[4] === gameData.boardData[8] && !gameData.boardData[0] && gameData.boardData[4]){
        ceilAction(0);
        return;
    }

    //Проверяем, есть ли где-нибудь 2 одинаковых занятых ячейки во второй диагонали. Если есть, занимаем оставшуюся
    if(gameData.boardData[2] === gameData.boardData[4] && !gameData.boardData[6] && gameData.boardData[2]){
        ceilAction(6);
        return;
    }else if(gameData.boardData[2] === gameData.boardData[6] && !gameData.boardData[4] && gameData.boardData[2]){
        ceilAction(4);
        return;
    }else if(gameData.boardData[4] === gameData.boardData[6] && !gameData.boardData[2] && gameData.boardData[4]){
        ceilAction(2);
        return;
    }

    //Если ни одна проверка не сработала, занимаем случайную свободную ячейку
    let randomFreeCeil = null;
    do{
        randomFreeCeil = Math.floor(Math.random() * (9));
    }while(gameData.boardData[randomFreeCeil]);

    ceilAction(randomFreeCeil);
}
