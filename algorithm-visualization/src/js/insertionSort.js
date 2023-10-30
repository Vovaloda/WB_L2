//Сортировка вставками, принимает массив 
async function insertionSortVisualization(arr){
    const bars = document.querySelectorAll('.bar'); //Получение всех столбцов
    
    for (let i = 0; i < arr.length; i++){
        if(stopAnim){ //Если анимаци на паузе, прекращаем сортировку 
            return;
        } 
        let v = arr[i];
        bars[i].style.backgroundColor = 'green'; //Изменение цвета столбца

        let j = i-1;

        while (j >= 0 && arr[j] > v){ 
            bars[j].style.backgroundColor = 'yellow';
            bars[j+1].style.backgroundColor = 'yellow';


            arr[j+1] = arr[j]; 

            await delay(delayMS/2); //Пауза перед следующим действием

            bars[j+1].style.height = arr[j+1] / maxItem * 500 + 'px'; //Изменение размера столбца
            bars[j].style.backgroundColor = 'lightgray';
            bars[j+1].style.backgroundColor = 'lightgray';
            j--; 

            await delay(delayMS/2);
        }

        bars[j+1].style.backgroundColor = 'green';

        arr[j+1] = v;

        await delay(delayMS/2);

        bars[j+1].style.height = arr[j+1] / maxItem * 500 + 'px';

        bars[j+1].style.backgroundColor = 'lightgray';

        bars[i].style.backgroundColor = 'lightgray';
    }           

    return arr;    
}