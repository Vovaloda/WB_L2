function getRandomNumber(min, max){ //Функция для поулчения случайного числа (включая границы)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wordEnding(n){ //Генерация правильной формы слова "Попытка" в заивисомсти от передаваемого количество
    const movesForms = ['попытку', 'попытки', 'попыток'];

    const per10 = n % 10;

    const per100 = n % 100;

    if(per10 === 1 && per100 !== 11){
        return movesForms[0];
    }
    else if(per10 >= 2 && per10 <= 4 && (per100 < 10 || per100>=20)){
        return movesForms[1];
    }
    else{
        return movesForms[2];
    }
}

//Функция, начинающая игру
function gameStart(){ 
    currentMovesBlock.textContent = 0; //Установка поля с количеством попыток
    isWin = false; //Установка флага победы 
    currentMovesBlock.style.color = 'black'; //Установка цвета блока с количеством попыток
    currentMoves = 0; //Установка текущего количества попыток
    mainText.textContent = 'ПОПРОБУЙТЕ УГАДАТЬ ЧИСЛО, КОТОРОЕ Я ЗАГАДАЛ'; //Установка главного текста по умолчанию
    
    currentNumber = getRandomNumber(minNumber, maxNumber); //Генерация случайного числа
}

gameStart(); //Начало игры

//Ивент на submit для основного блока
inputForm.addEventListener('submit', (e)=>{
    e.preventDefault(); //Отмена действий по умолчанию 
    const inputVal = guessingInput.value; //Считывание введённого числа 
    const integerNumberTest = /^[1-9]\d*$/; // Регулярка для проверки на целочисленноть

    if(isWin){ //Если пользователь уже победил, уведомляем его об этом
        alert('Вы уже победили. Перезагрузите игру, если хотите сыграть ещё раз');
        return;
    }

    if(guessingInput.value === ''){ //Если пользователь ничего не ввёл, ничего и не делаем, уведомляем пользователя 
        alert('Вы ничего не ввели. Попробуйте ввести число');

        return;
    }

    if(inputVal < minNumber){ //Если пользователь ввёл число, которое меньше минимального числа диапозона, уведомляем его об этом
        alert('Вы ввели число, которое меньше минимального числа диапазона. Минимальное число диапозона: ' + minNumber + ". Попробуйте ввести другое число");
        return;
    }

    if(inputVal > maxNumber){ //Если пользователь ввёл число, которое больше максимального числа диапозона, уведомляем его об этом
        alert('Вы ввели число, которое больше максимального числа диапазона. Максимальное число диапозона: ' + maxNumber + ". Попробуйте ввести другое число");
        return;
    }

    if(!integerNumberTest.test(inputVal)){ //Если пользователь ввёл нецелочисленное число, уведомляем его об этом
        alert('Вы ввели нецелочисленное число. Попробуйе ввести другое число');
        return;
    }

    currentMoves++; //Увеличиваем количество шагов
    currentMovesBlock.textContent = currentMoves; //Меняем инфомрацию в блоке о количестве шагов

    mainText.classList.add('text-hidden'); //Скрываем главный текст (для плавной анимации)

    let textToMainText = ''; //Переменная нового главного текста
    
    if(+inputVal === currentNumber){ //Если пользователь угадал 
        textToMainText = 'Поздравляю! Вы угадали за ' + currentMoves + " " + wordEnding(currentMoves); //Поздравляем пользователя и выводим информацию о количестве попыток
        currentMovesBlock.style.color = 'lightgreen'; //Изменяем цвет блока со шагами
        isWin = true; //Меняем переменную 
    }
    else if(+inputVal !== currentNumber){ //Если пользователь не угадал
        textToMainText = 'Вы не угадали. Загаднное число ' + (inputVal > currentNumber ? 'меньше введённого' : 'больше введённого'); //Сообщеам об этом пользователю и говорим, больше или меньше загаданное число
        
        if(currentMoves % 3 === 0 && currentNumber % 2 === 0){ //Если это 3 попытка пользователя и число чётное, даём подсказку 
            textToMainText += '. Дам подсказку: число чётное';
        }
        else if(currentMoves % 3 === 0 && currentNumber % 2 !== 0){ //Если это 3 попытка пользователя и число нечётное, даём подсказку  
            textToMainText += '. Дам подсказку: число нечётное';
        }
    }

    setTimeout(function() { //Меняем старый текст на новый с небольшой задержкой(для анимации)
        mainText.textContent = textToMainText;

        mainText.classList.remove('text-hidden');
      }, 260);
});
