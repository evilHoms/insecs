'use strict';

import './app.scss';

const state = {
  isMenu: false
};
//////////////////
// Выпадающее меню
//////////////////
const menuBtn = document.querySelector('.top__menu');
const menu = document.querySelector('.top__hidden-menu');
const menuCloseBtn = document.querySelector('.top__hidden-menu__close--btn');

menuCloseBtn.addEventListener('click', onMenuClick);
menuBtn.addEventListener('click', onMenuClick);

function onMenuClick(e) {
  e.preventDefault();

  if (state.isMenu) {
    state.isMenu = false;
    menu.classList.remove('hidden-menu--shown');
  }
  else {
    state.isMenu = true;
    menu.classList.add('hidden-menu--shown');
  }
}

//////////////////////////////////////
// Стартовый дропдаун с выбором города
//////////////////////////////////////
const dropdown = document.querySelector('.choose-the-city__select');
const startingChooseTheCity = document.querySelector('.choose-the-city');
dropdown.hide = true;
dropdown.addEventListener('click', onDropdownClick);

function onDropdownClick(e) {
  const elements = document.querySelectorAll('.choose-the-city__select>div');
  if (this.hide) {
    elements.forEach(el => {
      el.classList.remove('hidden');
    });
    this.hide = false;
  }
  else {

    if (!this.hide && e.target.classList.contains('choose-the-city__option')) {
      document.querySelectorAll('.choose-the-city__select>div').forEach(el => {
        el.classList.remove('selected');
      });
      e.target.classList.add('selected');
    }

    elements.forEach(el => {
      if (!el.classList.contains('selected')) {
        el.classList.add('hidden');
      }
    });
    this.hide = true;
  }
}

/////////////////////////////////////////////////////////
// Действия при закрытии стартового окна с выбором города
/////////////////////////////////////////////////////////
const dropdownCloseBtn = document.querySelector('.choose-the-city__close');
dropdownCloseBtn.addEventListener('click', onCloseClick);

function onCloseClick(e) {
  const city = dropdown.querySelector('.selected').dataset.city;
  setDataFromCity(city);
  startingChooseTheCity.classList.add('hidden');
}

function setDataFromCity(city) {
  console.log(dropdown.querySelector('.selected'));
  const topCity = document.querySelector('.top__city--text');
  topCity.textContent = dropdown.querySelector('.selected').textContent;

  // switch(city) {
  //   case 'moscow':
  //     topCity.textContent = 'г. Москва';
  //     break;
  //   case 'tula':
  //     topCity.textContent = 'Тульская область';
  //     break;
  //   case 'razan':
  //     topCity.textContent = 'г. Рязань';
  //     break;
  //   case 'kaluga':
  //     topCity.textContent = 'г. Калуга';
  //     break;
  // }
}

//////////////////////////////////////////////////////////
// Действия при отправке телефона в форме блока advantages
//////////////////////////////////////////////////////////
const phoneFormSendBtn = document.querySelector('.advantages__form__btn--send');
const phoneFormInput = document.querySelector('#advantages__form__phone')
phoneFormSendBtn.addEventListener('click', onSendClick);

function onSendClick(e) {
  e.preventDefault();
  console.log(`Entered phone number: ${phoneFormInput.value}`);
}

////////////////////////////////////////////////////////////
// Действия при отправке телефона в форме блока leavecontact
////////////////////////////////////////////////////////////
const phoneFormSendBtnC = document.querySelector('.leavecontact__form__btn--send');
const phoneFormInputC = document.querySelector('#leavecontact__form__phone')
phoneFormSendBtnC.addEventListener('click', onSendClickC);

function onSendClickC(e) {
  e.preventDefault();
  console.log(`Entered phone number: ${phoneFormInputC.value}`);
}

///////////////////////////////////////////
// Действия при нажатии на строку с городом
///////////////////////////////////////////

const chooseCity = document.querySelector('.top__city');
chooseCity.addEventListener('click', onCityClick);

function onCityClick(e) {
  document.querySelector('.choose-the-city').classList.remove('hidden');
}

/////////////////////////
// Логика калькулятора //
/////////////////////////

const insecs = [
  'Тараканы', 'Клопы', 'Муравьи', 'Грызуны', 'Насекомые'
];

const category = [
  'Квартира', 'Дом', 'Участок', 'Юр. Лицо'
];

const steps = [
  'Выберите тип вредителя', 
  'Выберите категорию объекта', 
  'Укажите площадь объекта', 
  'Выберите тип объекта', 
  'Стоимость обработки: ',
  'Ваша заявка принята'
]

let step = 0;

const calcInfo = {
  insec: '',
  category: '',
  size: '',
  phone: ''
};

const calcNextBtn = document.querySelectorAll('.calculator__next--btn');
const calcSendBtn = document.querySelector('.calculator__last--btn');
const calcResetBtn = document.querySelector('.calculator__reset--btn');
const calcControlls = document.querySelectorAll('.calculator__controls');
const calcSelects = document.querySelectorAll('.calculator__select');
const calcStepName = document.querySelector('.calculator__step-name');
const calcStep = document.querySelector('.step');
const calcProgress = document.querySelector('.calculator__progress-bar__line');
calcResetBtn.addEventListener('click', resetStep);
calcSendBtn.addEventListener('click',onCalcNextBtnClick);
calcNextBtn.forEach(el => {
  el.addEventListener('click', onCalcNextBtnClick);
});
calcSelects.forEach(el => {
  el.hide = true;
  el.addEventListener('click', toggleSelect);
});

function onCalcNextBtnClick(e) {
  e.preventDefault();

  if (step < 4) {
    calcControlls.forEach(el => {
      el.classList.add('hidden');
    })

    switch (step) {
      case 0:
        calcInfo.insec = document.querySelector('.insecs')
                                 .querySelector('.selected').textContent;
        document.querySelector('.category').classList.remove('hidden');
        calcStepName.textContent = steps[1];
        calcProgress.style.width = '20%';
        step ++;
        break;
      case 1:
      console.log(document)
        calcInfo.category = document.querySelector('.category')
                                    .querySelector('.selected').textContent;
        
        calcInfo.category === 'Квартира' ? calcStepName.textContent = steps[3] : calcStepName.textContent = steps[2];
        calcInfo.category === 'Квартира' ? document.querySelector('.sizeRooms').classList.remove('hidden') : document.querySelector('.size').classList.remove('hidden');
        calcProgress.style.width = '45%';
        if (calcInfo.category === 'Участок')
          calcStepName.textContent += ('(Сот)');
        if (calcInfo.category === 'Юр. Лицо' || calcInfo.category === 'Дом')
          calcStepName.textContent += ('(м)');
        step ++;
        break;
      case 2:
        if (calcInfo.category !== 'Квартира')
          calcInfo.size = document.querySelector('.size')
                                  .querySelector('.calculator__input').value;
        else {
          calcInfo.size = document.querySelector('.sizeRooms')
                                  .querySelector('.selected').textContent;
        }
        document.querySelector('.phone').classList.remove('hidden');
        calcStepName.textContent = steps[4];
        calcProgress.style.width = '65%';
        step ++;
        calcStepName.textContent += calcPrice() + 'р';
        break;
      case 3:
        calcInfo.phone = document.querySelector('.phone')
                                .querySelector('.calculator__input').value;
        calcStepName.textContent = steps[5];
        calcProgress.style.width = '85%';
        break;
    }

    calcStep.textContent = step + 1;
    
  }
  else {
    resetStep(e);
  }
}

function resetStep(e) {
  e.preventDefault();
  step = 0;
  calcInfo.insec = '';
  calcInfo.category = '';
  calcInfo.size = '';
  calcInfo.phone = '';
  calcControlls.forEach(el => {
    el.classList.add('hidden');
  });
  document.querySelector('.insecs').classList.remove('hidden');
  calcStep.textContent = step + 1;
  calcStepName.textContent = steps[0];
  calcProgress.style.width = '0.7%';
}

function toggleSelect(e) {
  console.log('here');
  const elements = this.querySelectorAll('.calculator__select>div');
  if (this.hide) {
    elements.forEach(el => {
      el.classList.remove('hidden');
    });
    this.hide = false;
  }
  else {

    if (!this.hide && e.target.classList.contains('calculator__option')) {
      console.log('here2');
      document.querySelectorAll('.calculator__select>div').forEach(el => {
        el.classList.remove('selected');
      });
      e.target.classList.add('selected');
    }

    elements.forEach(el => {
      if (!el.classList.contains('selected')) {
        el.classList.add('hidden');
      }
    });
    this.hide = true;
  }
}

function calcPrice() {
  const city = document.querySelector('.top__city--text').textContent;
  const size = calcInfo.size;
  const category = calcInfo.category;

  if (category === 'Участок') {
    if (size > 0 && size < 6) {
      return 2500;
    }
    if (size === 6) {
      return 3000;
    }
    if (size === 7) {
      return 3500;
    }
    if (size === 8) {
      return 4000;
    }
    if (size === 9 || size === 10) {
      return 4500;
    }
    if (size > 10) {
      return 4500 + (size - 10) * 300;
    }
  }
  if (category === 'Юр. лицо' || category === 'Дом') {
    switch (city) {
      case 'Новомосковск':
      case 'Донской':
      case 'Узловая':
      case 'Кимовск':
        if (size < 100)
          return 2500;
        if (size > 100)
          return 4500;
        break;
      case 'Тула':
      case 'Щекино':
      case 'Болохово':
      case 'Киреевск':
        if (size < 100)
          return 3000;
        if (size > 100)
          return 5000;
        break;
      case 'Алексин':
      case 'Ефремов':
      case 'Ясногорск':
      case 'Москва':
      case 'Моск. Обл.':
      case 'Железногорск':
      case 'Брянск':
      case 'Орел':
        if (size < 100)
          return 3500;
        if (size > 100)
          return 5500;
        break;
      case 'Рязань':
      case 'Калуга':
        if (size < 100)
          return 4000;
        if (size > 100)
          return 6000;
        break;
    }
  }

  if (category === 'Квартира') {
    switch (city) {
      case 'Новомосковск':
      case 'Донской':
      case 'Узловая':
      case 'Кимовск':
        switch (size) {
          case 'Комната':
            return 900;
          case '1 комнатаная':
            return 1800;
          case '2-х комнатная':
            return 2200;
          case '3-х комнатная':
            return 2500;
          case '4-х комнатная':
            return 2800;
        }
        break;
      case 'Тула':
      case 'Щекино':
      case 'Болохово':
      case 'Киреевск':
        switch (size) {
          case 'Комната':
            return 1100;
          case '1 комнатаная':
            return 2000;
          case '2-х комнатная':
            return 2500;
          case '3-х комнатная':
            return 3000;
          case '4-х комнатная':
            return 3300;
        }
        break;
      case 'Алексин':
      case 'Ефремов':
      case 'Ясногорск':
        switch (size) {
          case 'Комната':
            return 1500;
          case '1 комнатаная':
            return 3000;
          case '2-х комнатная':
            return 3200;
          case '3-х комнатная':
            return 3500;
          case '4-х комнатная':
            return 3800;
        }
      case 'Москва':
      case 'Моск. Обл.':
      case 'Железногорск':
      case 'Брянск':
      case 'Орел':
        switch (size) {
          case 'Комната':
            return 1300;
          case '1 комнатаная':
            return 2500;
          case '2-х комнатная':
            return 3000;
          case '3-х комнатная':
            return 3500;
          case '4-х комнатная':
            return 3700;
        }
      case 'Рязань':
      case 'Калуга':
        switch (size) {
          case 'Комната':
            return 2000;
          case '1 комнатаная':
            return 3500;
          case '2-х комнатная':
            return 3700;
          case '3-х комнатная':
            return 4000;
          case '4-х комнатная':
            return 4200;
        }
    }
  }
}