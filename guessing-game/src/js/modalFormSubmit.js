//Установка ивента для модального окна при submit
modalForm.addEventListener('submit', (e)=>{
    e.preventDefault(); //Оставнока действий по умолчанию

    const integerNumberTest = /^[1-9]\d*$/; //Регулярка для проверки целочисленности 

    if(+minNumberInput.value < 1){ //Если введённое число меньше 1, предупреждаем пользователя
        alert('Минимальное число не может быть меньше 1');

        return;
    }
    if(+minNumberInput.value > +maxNumberInput.value){ //Если минимальное число больше максимального, предупреждаем пользователя
        alert('Минимальное число не может быть больше максимального числа');

        return;
    }

    if(+maxNumberInput.value > 1000){ //Если введённое число больше 1000, предупреждаем пользователя
        alert('Максимальное число не может быть больше 1000');

        return;
    }

    if(!integerNumberTest.test(minNumberInput.value) || !integerNumberTest.test(maxNumberInput.value)){ //Если введённое число не целочисленное, предупреждаем пользователя
        alert('Числа должны быть целочисленными');
        
        return;
    }

    //Устанавливаем стандартные значения для игры и инпутов
    maxNumber = +maxNumberInput.value; 
    minNumber = +minNumberInput.value;
    minNumberField.textContent = minNumber;
    maxNumberField.textContent = maxNumber;

    modalWindow.style.display = 'none'; //Скрываем модальное окно

    gameStart(); //запускаем игру
});