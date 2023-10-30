//При изменении инпута
fileInput.addEventListener('change',()=>{
    //Получаем файл
    const file = fileInput.files[0];
    //Если файл не PNG, ничего не делаем и уведомляем об этом пользователя
    if(file.type !== 'image/png'){
        alert('Загрузите изображение в .png!');
        return; 
    }
    //Если файл загрузился
    if(file) {
        const reader = new FileReader();
        
        //При загрузке ридера
        reader.onload = function(e) {
            const uploadField = document.querySelector('.upload');
            const generatorContainerField = document.querySelector('.generator__container');

            //Устанавливаем ссылку
            memeImg.src = e.target.result;
            //Отображаем и скрываем нужные элементы
            uploadField.style.display = 'none';
            generatorContainerField.style.display = 'flex';
            //Устанавливаем параметры ширины и высоты блокам спустя небольшую задержку (когда выполнятся линейные команды)
            setTimeout(()=>{
                imgContainer.style.width = memeImg.width + 'px';
                imgContainer.style.height = memeImg.height + 'px';

                canvas.width = memeImg.width;
                canvas.height = memeImg.height;
                ctx.width = memeImg.width;
                ctx.height = memeImg.height;
            },0); 
        };
                
        reader.readAsDataURL(file);
    } 
    //Если файл не загрузился, ничего не показываем
    else{
        memeImg.src = '';
        memeImg.style.display = 'none';
    }
});