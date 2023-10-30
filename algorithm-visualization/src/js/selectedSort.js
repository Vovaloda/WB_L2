//Сортировка методом выбора, принимает массив
async function selectedSortVisualization(arr){
    const bars = document.querySelectorAll('.bar'); //Получение всех столбцов

    for (let i = 0; i < arr.length - 1; i++) {
        if(stopAnim){ //Если анимация на паузе, прекращаем сортировку
            return;
        }
        let min = i;
        bars[i].style.backgroundColor = 'yellow'; //Изменение цвета столбца
    
        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            if (arr[min] > arr[j]) {
                if(min !== i){
                    bars[min].style.backgroundColor = 'lightgray';
                }
                min = j;
                bars[min].style.backgroundColor = 'green';
            }

          await delay(delayMS/2); //Пауза перед следующим действием
          if(j !== min){
            bars[j].style.backgroundColor = 'lightgray';
          }
        }
    
        [arr[i], arr[min]] = [arr[min], arr[i]];
        await delay(delayMS/2);
        bars[i].style.height = arr[i] / maxItem * 500 + 'px'; //Изменение размера столбца
        bars[min].style.height = arr[min] / maxItem * 500 + 'px';
        bars[i].style.backgroundColor = 'lightgray';
        bars[min].style.backgroundColor = 'lightgray';
    }
}
