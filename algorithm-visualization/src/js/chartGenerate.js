//Функция генерации столбцов
function generateChart(data){
    chartContainer.innerHTML = ''; //Очистка поля

    for (let i = 0; i < data.length; i++) { //Созданием нужного окличества элементов
        let bar = document.createElement('div');
        bar.className = 'bar';
        const barHeight = data[i] / maxItem * 500; //деление каждого элемента на максимальный и умножение на 500, чтобы все элементы были в диапозоне от 0 до 500
        bar.style.height = barHeight + 'px';
        chartContainer.appendChild(bar);
    }
}
