//Сохранение картинки при клике на кнопку
savePicture.addEventListener('click',()=>{

    //Создаём новую картинку и присываем ей ссылку на загруженную
    const imgToCanvas = new Image();

    imgToCanvas.src = memeImg.src;

    //Получаем все добавленные пользователем текста
    const textsToCanvas = document.querySelectorAll('.movable');

    imgToCanvas.onload = function () {
        ctx.drawImage(imgToCanvas, 0, 0); //Отображаем картинку

        //Отображаем текста на картинке
        if(textsToCanvas.length > 0){
            textsToCanvas.forEach((el)=>{
                ctx.fillStyle = el.style.color; //Устанавливаем цвет
                ctx.font = "15px Arial"; //Устанавливаем размер шрифта и название шрифта
                ctx.fillText(el.textContent, parseInt(el.style.left) + 5, parseInt(el.style.top) + 20); //Устанавливаем позицию, учитывая paddin и размер
            });
        }
    }

    setTimeout(()=>{ //Выполняем с небольшой задержкой, чтобы картинка успела загрузиться
        //Создаём новую картинку и ссылку, ссылку добавляем на страницу
        const imgToDownload = new Image();

        const linkImgDownload = document.createElement('a');
        document.body.appendChild(linkImgDownload);
        
        imgToDownload.src = canvas.toDataURL('image/png'); //Переводим Канвас в картинку (png)
        
        //Устанавливаем ссылку и название картинки
        linkImgDownload.href = imgToDownload.src; 
        linkImgDownload.download = 'meme.png';
        
        //Искуственно кликаем на ссылку
        linkImgDownload.click();
        
        //Удаляем ссылку со страницы
        document.body.removeChild(linkImgDownload);
    },1000);
});
