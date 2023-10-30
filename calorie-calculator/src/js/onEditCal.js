//При изменении текущих калорий
function onEditCurrentCal(cal){
    currentCal = cal;

    const personalCaltEl = document.querySelector('.personal__cal');
    personalCaltEl.textContent = currentCal; //Изменяем значение элемента

    const alertEl = document.querySelector('.alert');

    //Если превысили дневную норму, показываем предупреждение
    if(dailyCal < currentCal){
        alertEl.style.display = 'block';   
    }else{
        alertEl.style.display = 'none'; 
    }

}

//При изменении дневных калорий
function onEditDailyCal(cal){
    const regNum = /^\d+$/;

    //Если пользователь ввёл не число, уведомляем его об этом
    if(!regNum.test(cal)){
        alert('Калории могут быть только числом');
        return;
    }

    dailyCal = +cal;

    const dayCalLimitEl = document.querySelector('.day-cal-limit');
    dayCalLimitEl.textContent = dailyCal; //Меняем значение элемента

    const alertEl = document.querySelector('.alert');

    //Если превысили дневную норму, показываем предупреждение
    if(dailyCal < currentCal){
        alertEl.style.display = 'block';   
    }else{
        alertEl.style.display = 'none'; 
    }

    saveData();
}
