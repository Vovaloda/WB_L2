//Быстрая сортировка, принимает массив
async function quickSortVisualization(arr) {
    const stack = [{ left: 0, right: arr.length - 1 }]; //Созданием стека
  
    while(stack.length) {
      if(stopAnim){ //Если анимация на паузе, прекращаем сортировку
        return;
      }
      const { left, right } = stack.pop();
      const pivotIndex = await partitionVisualization(arr, left, right); //Получение основной сортировки путём деления

      if(stopAnim){ //Если анимация на паузе, прекращаем сортировку
        return;
      }
  
      //Крайние шаги
      if (pivotIndex - 1 > left) {
        stack.push({ left, right: pivotIndex - 1 });
      }
  
      if (pivotIndex + 1 < right) {
        stack.push({ left: pivotIndex + 1, right });
      }
    }
  
    //Перерендер столбцов для крайних шагов
    generateChart(arr);
    return arr;
}
  
//Деление массива и визуализация сортировки
async function partitionVisualization(arr, left, right) {
    const bars = document.querySelectorAll('.bar'); //Полуение всех столбцов

    if(stopAnim){ //Если анимация на паузе, прекращаем сортировку
      return;
    }

    const pivotValue = arr[right];
    bars[right].style.backgroundColor = 'purple'; //Изменение цвета столбца
    let partitionIndex = left;
  
    for (let i = left; i < right; i++) {
        bars[i].style.backgroundColor = 'yellow';
        bars[partitionIndex].style.backgroundColor = 'green';

        if (arr[i] < pivotValue) {
            [arr[partitionIndex], arr[i]] = [arr[i], arr[partitionIndex]];
            bars[partitionIndex].style.height = arr[partitionIndex] / maxItem * 500 + 'px';
            bars[i].style.height = arr[i] / maxItem * 500 + 'px'; //Изменение размера столбца
            await delay(delayMS/2); //Задержка перед следующим этапом
            bars[partitionIndex].style.backgroundColor = 'lightgray';
            partitionIndex++;
        }

        bars[partitionIndex].style.backgroundColor = 'lightgray';
        bars[i].style.backgroundColor = 'lightgray';
    }

    bars[partitionIndex].style.backgroundColor = 'yellow';
    
    [arr[partitionIndex], arr[right]] = [arr[right], arr[partitionIndex]];
    bars[partitionIndex].style.height = arr[partitionIndex] / maxItem * 500 + 'px';
    bars[right].style.height = arr[right] / maxItem * 500 + 'px';
    await delay(delayMS/2);
    bars[partitionIndex].style.backgroundColor = 'lightgray';
    bars[right].style.backgroundColor = 'lightgray';
    return partitionIndex;
}