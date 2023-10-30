//Получение нужных элементов
const imgContainer = document.querySelector('.img__container');

const addTextButton = document.querySelector('.add-text');
const savePicture = document.querySelector('.save-picture');

const settingField = document.querySelector('.body__setting');

const fileInput = document.querySelector('.fileInput');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const memeImg = document.querySelector('.image-meme');

const rRange = document.querySelector('#r');
const gRange = document.querySelector('#g');
const bRange = document.querySelector('#b');

//Установка значений по умолчанию
let selectedBlock = null;

let isDragging = false;

//Если где-нибудь на экране отпустили кнопку мыши, меняем тригер возможности двигать на false
document.addEventListener('mouseup', function () {
    isDragging = false;
});

//Ивент на клик при нажатии кнопки добавления текста
addTextButton.addEventListener('click', ()=>{

    const memeTextInput = document.querySelector('.meme-text-input');

    //Если ничего не введено, ничего не делаем и уведомляем пользователя
    if(memeTextInput.value === ''){
        alert('Введите текст для мема');
        return;
    }

    //Создаём элемент span и задём ему нужные настройки и значение
    const spanTmp = document.createElement('span');

    spanTmp.textContent = memeTextInput.value;
    spanTmp.classList.add('movable');
    spanTmp.style.position = 'absolute';

    spanTmp.style.top = '0px';
    spanTmp.style.left = '0px';
    spanTmp.style.color = 'rgb(0,0,0)';
    spanTmp.style.fontSize = '15px';
    spanTmp.style.fontFamily = 'Arial';
    spanTmp.style.padding = '5px';

    //Устанавливаем контекст созданным блоком и передаём в функции настройки текста
    selectedBlock = spanTmp;
    contextSetting(selectedBlock);

    //Установка ивента по нажатии на созданный элемент
    spanTmp.addEventListener('mousedown', function (e) {
        isDragging = true; //Меняем тригер

        //Устанавливаем выбранный элемент и передаём его в настройку текста
        selectedBlock = spanTmp;
        contextSetting(selectedBlock);
      
        //Получаем текущее положение элемента
        let offsetX = e.clientX - spanTmp.getBoundingClientRect().left;
        let offsetY = e.clientY - spanTmp.getBoundingClientRect().top;
      
        //Хендлер для передвижения элемента
        function handler(e) {
          if (isDragging) { //Делаем что-то только, если триггер перемещения активен
            //Получаем новое положение элемента
            let newX = e.clientX - offsetX - imgContainer.getBoundingClientRect().left;
            let newY = e.clientY - offsetY - imgContainer.getBoundingClientRect().top;
      
            //Изменяем положение, если не вышли за границы мема
            if (newX >= 0 && newX + spanTmp.clientWidth <= imgContainer.clientWidth) {
                spanTmp.style.left = newX + 'px';
            }
      
            if (newY >= 0 && newY + spanTmp.clientHeight <= imgContainer.clientHeight) {
                spanTmp.style.top = newY + 'px';
            }
          }
        }
      
        //Добавляем ивент и хендлер, а также удаляем предыдущий добавленный
        spanTmp.removeEventListener('mousemove', handler);
        spanTmp.addEventListener('mousemove', handler);
      });

    //Добавляем элемент на сайт
    imgContainer.appendChild(spanTmp);
});
