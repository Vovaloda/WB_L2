//Функция получения цвета элемента
function contextSetting(el){
    //Получаем цвет и приводим его в удобный вид (r, g, b)
    const elColor = el.style.color;
    const start_pos = elColor.indexOf('(') + 1;
    const end_pos = elColor.indexOf(')');
    const rgb = elColor.substring(start_pos, end_pos);
    const rgbArray = rgb.split(',');
    const r = +rgbArray[0];
    const g = +rgbArray[1];
    const b = +rgbArray[2];

    //Устанавливаем ползунки в нужное положение
    rRange.value = r;
    gRange.value = g;
    bRange.value = b;
}

//Изменение рейнджов
rRange.addEventListener('input', ()=>{
    if(selectedBlock){ //Выполняем только, если есть выбранный блок
        const textColor = `rgb(${rRange.value},${gRange.value},${bRange.value})`;
        selectedBlock.style.color = textColor; //Меняем цвет блоку
    }
});

gRange.addEventListener('input', ()=>{
    if(selectedBlock){
        const textColor = `rgb(${rRange.value},${gRange.value},${bRange.value})`;
        selectedBlock.style.color = textColor;
    }
});

bRange.addEventListener('input', ()=>{
    if(selectedBlock){
        const textColor = `rgb(${rRange.value},${gRange.value},${bRange.value})`;
        selectedBlock.style.color = textColor;
    }
});
