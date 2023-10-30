//Циклическая сортировка, принимает массив 
async function cycleSortVisualization(arr){
    const bars = document.querySelectorAll('.bar'); //Получение всех столбцов

    for (let i = 0; i < arr.length; i++) {
        if(stopAnim){ //Если анимация на паузе, прекращаем сортировку
          return;
        }

        bars[i].style.backgroundColor = 'yellow'; //Изменение цвета столбца

        let value = arr[i];
        let position = i;
    
        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
          if (arr[j] < value) {
            if(position !== i){
                bars[position].style.backgroundColor = 'lightgray';
            }
            position++;
            bars[position].style.backgroundColor = 'green';
          }

          await delay(delayMS/4); //Задержка перед слдующим действием

          if(j !== position){
            bars[j].style.backgroundColor = 'lightgray';
          }
        }
        if (position === i) {
            bars[i].style.backgroundColor = 'lightgray';
            continue;
        }
        while (value === arr[position]) { 
            position++;
        }
    
        [arr[position], value] = [value, arr[position]]; 
        bars[position].style.height = arr[position] / maxItem * 500 + 'px'; //Изменение размера слобца
        bars[position].style.backgroundColor = 'lightgray';
        await delay(delayMS/4);
    
        while (position !== i) { 
          position = i;
          bars[position].style.backgroundColor = 'yellow';
          for (let k = i + 1; k < arr.length; k++) {
            bars[k].style.backgroundColor = 'yellow';
            if (arr[k] < value) {
                if(position !== i){
                    bars[position].style.backgroundColor = 'lightgray';
                }
                position++;
                bars[position].style.backgroundColor = 'green';
            }
            await delay(delayMS/4);
            if(k !== position){
                bars[k].style.backgroundColor = 'lightgray';
            }
          }
          while (value === arr[position]) { 
            position++;
          }
          [arr[position], value] = [value, arr[position]];
          bars[position].style.height = arr[position] / maxItem * 500 + 'px';
          bars[position].style.backgroundColor = 'lightgray';
          await delay(delayMS/4);
        }

        bars[i].style.backgroundColor = 'lightgray';
      }
}