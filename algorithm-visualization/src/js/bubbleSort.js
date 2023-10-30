//Сортировка пузырьком, принимает массив
async function bubbleSortVisualization(arr){
    const bars = document.querySelectorAll('.bar'); //Поулчение всех столбцов диаграммы

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if(stopAnim){ //Если анимация на паузе, прекращаем сортировку 
                return;
            }
            bars[j].style.backgroundColor = 'yellow'; //Изменение цвета столбца
            bars[j+1].style.backgroundColor = 'yellow';
            await delay(delayMS/2); //Задержка перед следующим действием
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                bars[j].style.height = arr[j] / maxItem * 500 + 'px'; //Изменение размера столбца
                bars[j+1].style.height = arr[j+1] / maxItem * 500 + 'px';
            }
            await delay(delayMS/2);
            bars[j].style.backgroundColor = 'lightgray';
            bars[j+1].style.backgroundColor = 'lightgray';
        }
    }
}