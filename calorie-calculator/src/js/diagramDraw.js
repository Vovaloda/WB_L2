function circleDiagramDraw(){
    const calDiagramBlock = document.querySelector('.cal__diagram'); //Получение блока с диаграммой

    if(data.length === 0){ //если нечего отрисовывать, скрываем блок
        calDiagramBlock.style.display = 'none';
        return;
    }

    calDiagramBlock.style.display = 'block';

    // Переменная для угла начала для первого сегмента
    let startAngle = 0;

    // Радиус диаграммы
    let radius = canvas.width / 2;

    // Координаты центра диаграммы
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Отрисовка сегментов диаграммы
    data.forEach(item => {
        const percentage = (item.cal / currentCal); //Расчёт того, какую часть должен занимать сегмет
        const endAngle = startAngle + (Math.PI * 2 * percentage); //рассчёт, где конечная точка сегмента

        // Задаем цвет сегмента
        ctx.fillStyle = getRandomColor(); //Получение случайного цвета

        // Рисуем сегмент
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Добавляем подпись
        const labelX = centerX + radius * 0.5 * Math.cos(startAngle + (endAngle - startAngle) / 2);
        const labelY = centerY + radius * 0.5 * Math.sin(startAngle + (endAngle - startAngle) / 2);
        ctx.fillStyle = 'black'; // Цвет текста
        ctx.font = '10px Arial'; // Размер и шрифт текста
        ctx.fillText(item.name, labelX, labelY);

        // Обновляем угол начала для следующего сегмента
        startAngle = endAngle;
    });

    // Генерация случайного цвета
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}