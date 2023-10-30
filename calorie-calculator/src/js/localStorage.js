
//Функция для загрузки из localStorage
function loadData(){ 
    const localStorageData = localStorage.getItem('Data'); 
    const localStorageDailyCal = localStorage.getItem('dayliCal'); 

    if(localStorageDailyCal){ //Если данные есть, меняем значение
        onEditDailyCal(JSON.parse(localStorageDailyCal));
    }

    if(localStorageData){ //Если данные есть, меняем значение
        data = JSON.parse(localStorageData);
    }

    //Отрисовываем нужные элементы
    tableGenerate(); 
    circleDiagramDraw();
}

//Функция для сохранения в localStorage
function saveData(){ 
    localStorage.setItem('Data', JSON.stringify(data));
    localStorage.setItem('dayliCal', JSON.stringify(dailyCal));
}

loadData();