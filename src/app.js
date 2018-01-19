'use strict';

import './app.scss';

function Request(phone = 'телефон не указан', type = 'вид не указан', category = 'категория объекта не указана', size = 'площадь не указана') {
  const formdata = new FormData();
  formdata.append('type', type);
  formdata.append('phone', phone);
  formdata.append('category', category);
  formdata.append('size', size);
  const url = 'mail.php';
  const options = { 
    method: 'POST',
    body: formdata
  };
  console.log(formdata.get('phone'));
  console.log(formdata.get('type'));
  console.log(formdata.get('category'));
  console.log(formdata.get('size'));
  fetch(url, options)
    .then(res => console.log(res))
    .catch(er => console.log(er));
}

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
const tel = document.querySelector('.top__tel--text');
const contactTel = document.querySelector('.tel__text');
const contactAdress = document.querySelector('.adress__text');
const contactMap = document.querySelector('.our-cntacts__data__map');
const dropdown = document.querySelector('.choose-the-city__select');
const startingChooseTheCity = document.querySelector('.choose-the-city');
dropdown.hide = true;
dropdown.addEventListener('click', onDropdownClick);

function onDropdownClick(e) {
  const elements = document.querySelectorAll('.choose-the-city__select>div');
  if (this.hide) {
    elements.forEach(el => {
      this.classList.add('opened');
      el.classList.remove('hidden');
      el.classList.add('opened-element');
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
        el.classList.remove('opened-element');
        this.classList.remove('opened');
      }
    });
    this.hide = true;
  }
}

/////////////////////////////////////////////////////////
// Действия при закрытии стартового окна с выбором города
/////////////////////////////////////////////////////////
const dropdownCloseBtn = document.querySelector('.choose-the-city__close');
const dropdownOkBtn = document.querySelector('.choose-the-city__ok');
dropdownCloseBtn.addEventListener('click', onCloseClick);
dropdownOkBtn.addEventListener('click', onCloseClick);

function onCloseClick(e) {
  const city = dropdown.querySelector('.selected').dataset.city;
  setDataFromCity(city);
  startingChooseTheCity.classList.add('hidden');
}

function setDataFromCity(city) {
  const topCity = document.querySelector('.top__city--text');
  topCity.textContent = dropdown.querySelector('.selected').textContent;

  switch(document.querySelector('.top__city--text').textContent) {
      case 'Тула':
      case 'Щекино':
      case 'Болохово':
      case 'Киреевск':
        tel.textContent = '+7 (487) 263 67 17';
        contactTel.textContent = '+7 (487) 263 67 17';
        contactTel.classList.remove('hidden');
        break;
      case 'Новомосковск':
      case 'Донской':
      case 'Узловая':
      case 'Кимовск':
      case 'Алексин':
      case 'Ефремов':
      case 'Ясногорск':
      case 'Железногорск':
      case 'Брянск':
      case 'Орел':
      case 'Калуга':
        tel.textContent = '+7 (800) 505 49 06';
        // contactTel.textContent = '+7 (800) 505 49 06';
        contactTel.classList.add('hidden');
        break;
      case 'Рязань':
        tel.textContent = '+7 (491) 242 71 22';
        contactTel.textContent = '+7 (491) 242 71 22';
        contactTel.classList.remove('hidden');
        break;
      case 'Москва':
      case 'Моск. Обл.':
        tel.textContent = '+7 (499) 700 10 55';
        contactTel.textContent = '+7 (499) 700 10 55';
        contactAdress.textContent = 'г. Москва, октябрьская, 33';
        contactTel.classList.remove('hidden');
        break;
    }

    const maps = {
      msk: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.2459887661303!2d37.61096821626544!3d55.78896638056302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a05fc23869d%3A0x4d9372252746cb32!2z0J7QutGC0Y_QsdGA0YzRgdC60LDRjyDRg9C7LiwgMzMsINCc0L7RgdC60LLQsCwgMTI3MDE4!5e0!3m2!1sru!2sru!4v1516279697383" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      tyla: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2334.6393604630525!2d37.59063171621754!3d54.18646258016358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413440769a06c331%3A0xe354974309eb0032!2z0YPQuy4g0KTRgNGD0L3Qt9C1LCA0Miwg0KLRg9C70LAsINCi0YPQu9GM0YHQutCw0Y8g0L7QsdC7LiwgMzAwMDM0!5e0!3m2!1sru!2sru!4v1516280023790" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      aliksin: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2317.028274743489!2d37.06479381622672!3d54.49772478023651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4134f0df75e7c90b%3A0x5354eab5eded279!2z0YPQuy4g0JvQtdC90LjQvdCwLCAyMiwg0JDQu9C10LrRgdC40L0sINCi0YPQu9GM0YHQutCw0Y8g0L7QsdC7LiwgMzAxMzYy!5e0!3m2!1sru!2sru!4v1516280145559" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      nvmsk: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2346.3794190049452!2d38.3075473162113!3d53.97828718011631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41369967f3bf7401%3A0x1f934ca735c93189!2z0J3QvtCy0L7QvNC-0YHQutC-0LLRgdC60LDRjyDRg9C7LiwgNTgsINCU0L7QvdGB0LrQvtC5LCDQotGD0LvRjNGB0LrQsNGPINC-0LHQuy4sIDMwMTc3Mw!5e0!3m2!1sru!2sru!4v1516361305705" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      zhelenogorsk: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.6282705402023!2d35.36121051616328!3d52.340889479780735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412dd75cc048f745%3A0xb4984b0c289c09d8!2z0YPQuy4g0JPQsNCz0LDRgNC40L3QsCwgMTEsINCW0LXQu9C10LfQvdC-0LPQvtGA0YHQuiwg0JrRg9GA0YHQutCw0Y8g0L7QsdC7LiwgMzA3MTcx!5e0!3m2!1sru!2sru!4v1516280191400" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      bransk: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.3530267365513!2d34.351438316189686!3d53.24737297995838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412d585c184dc599%3A0xbe2b4bdb6c0b1bee!2z0YPQuy4g0KHQvtCy0LXRgtGB0LrQsNGPLCAxNywg0JHRgNGP0L3RgdC6LCDQkdGA0Y_QvdGB0LrQsNGPINC-0LHQuy4sIDI0MTA1MA!5e0!3m2!1sru!2sru!4v1516280226725" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      orel: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2403.4995702975098!2d36.062212216181265!3d52.9574269798994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41321a77bbe42329%3A0xa03b8eeb6451a45c!2z0YPQuy4g0JrQvtC80YHQvtC80L7Qu9GM0YHQutCw0Y8sIDUwLCDQntGA0ZHQuywg0J7RgNC70L7QstGB0LrQsNGPINC-0LHQuy4sIDMwMjAwMQ!5e0!3m2!1sru!2sru!4v1516280270877" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      kaluga: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2316.0258790720036!2d36.24834331622717!3d54.515404980240596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4134ba32c80b8a57%3A0x100b20bcc7b81b9e!2z0YPQuy4g0JrQuNGA0L7QstCwLCAxMywg0JrQsNC70YPQs9CwLCDQmtCw0LvRg9C20YHQutCw0Y8g0L7QsdC7LiwgMjQ4MDAx!5e0!3m2!1sru!2sru!4v1516280298462" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      razan: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2310.212989845948!2d39.71829821623038!3d54.61785588026517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4149e23e9afcd79f%3A0x8b088076a7af5f0d!2z0YPQuy4g0J_Rg9GI0LrQuNC90LAsIDM4LCDQoNGP0LfQsNC90YwsINCg0Y_Qt9Cw0L3RgdC60LDRjyDQvtCx0LsuLCAzOTAwMDU!5e0!3m2!1sru!2sru!4v1516280325355" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
    }

    switch(document.querySelector('.top__city--text').textContent) {
      case 'Тула':
      case 'Щекино':
      case 'Болохово':
      case 'Киреевск':
        contactAdress.textContent = 'Тула, Фрунзе, 42';
        contactMap.innerHTML = maps.tyla;
        break;
      case 'Новомосковск':
      case 'Донской':
      case 'Узловая':
      case 'Кимовск':
        contactAdress.textContent = 'г. Донской, Новомосковская, 58';
        contactMap.innerHTML = maps.nvmsk;
        break;
      case 'Алексин':
      case 'Ефремов':
      case 'Ясногорск':
        contactAdress.textContent = 'г. Алексин, Ленина, 22';
        contactMap.innerHTML = maps.aliksin;
        break;
      case 'Железногорск':
        contactAdress.textContent = 'г. Железногорск, Гагарина 11';
        contactMap.innerHTML = maps.zhelenogorsk;
        break;
      case 'Брянск':
        contactAdress.textContent = 'г. Брянск, Советская, 17';
        contactMap.innerHTML = maps.bransk;
        break;
      case 'Орел':
        contactAdress.textContent = 'г. Орел, Комсомольская, 50';
        contactMap.innerHTML = maps.orel;
        break;
      case 'Калуга':
        contactAdress.textContent = 'г. Калуга, Кирова, 13';
        contactMap.innerHTML = maps.kaluga;
        break;
      case 'Рязань':
        contactAdress.textContent = 'г. Рязань, Пушкина, 38';
        contactMap.innerHTML = maps.razan;
        break;
      case 'Москва':
      case 'Моск. Обл.':
        contactAdress.textContent = 'г. Москва, октябрьская, 33';
        contactMap.innerHTML = maps.msk;
        break;
    }
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
  Request(phoneFormInput.value);
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
  Request(phoneFormInputC.value);
}

///////////////////////////////////////////////////////
// Действия при отправке телефона в форме блока request
///////////////////////////////////////////////////////
const phoneFormSendBtnR = document.querySelector('.request__form__btn--send');
const phoneFormInputR = document.querySelector('#request__form__phone')
phoneFormSendBtnR.addEventListener('click', onSendClickR);

function onSendClickR(e) {
  e.preventDefault();
  console.log(`Entered phone number: ${phoneFormInputR.value}`);
  Request(phoneFormInputR.value);
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
  const progress = document.querySelector('.calculator__progress');

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
        progress.textContent = '25%';
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
          progress.textContent = '50%';
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
        progress.textContent = '75%';
        step ++;
        calcStepName.textContent += calcPrice() + 'р';
        break;
      case 3:
        calcInfo.phone = document.querySelector('.phone')
                                .querySelector('.calculator__input').value;
        calcStepName.textContent = steps[5];
        calcProgress.style.width = '85%';
        progress.textContent = '100%';
        break;
    }

    calcStep.textContent = step + 1;
    
  }
  else {
    resetStep(e);
  }

  if (this.classList.contains('calculator__last--btn')) {
    Request(calcInfo.phone, calcInfo.insec, calcInfo.category, calcInfo.size);
  }
}

function resetStep(e) {
  e.preventDefault();
  document.querySelector('.calculator__progress').textContent = '0%';
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

  const calcSelects = document.querySelector('.calculator').querySelectorAll('.calculator__select');
  calcSelects.forEach(el => {
    const opts = el.querySelectorAll('.calculator__option');
    opts.forEach(elm => {
      elm.classList.add('hidden');
      elm.classList.remove('selected');
    });
    opts[0].classList.remove('hidden');
    opts[0].classList.add('selected');
  });
}

function toggleSelect(e) {
  const elements = this.querySelectorAll('.calculator__select>div');
  if (this.hide) {
    elements.forEach(el => {
      el.classList.remove('hidden');
    });
    this.hide = false;
  }
  else {

    if (!this.hide && e.target.classList.contains('calculator__option')) {
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
    if (size < 6) {
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

/////////////////////////////////////////////////
// Отзывы  //////////////////////////////////////
/////////////////////////////////////////////////

const prevRevBtn = document.querySelector('.rewiews__btn--prev');
const nextRevBtn = document.querySelector('.rewiews__btn--next');
const revTitle = document.querySelector('.rewiews__item__title');
const revText = document.querySelector('.rewiews__item__text');
const revDate = document.querySelector('.rewiews__item__data');

prevRevBtn.addEventListener('click', onPrevRevClick);
nextRevBtn.addEventListener('click', onNextRevClick);

let currentRev = 0;
const reviews = [
  {
    date: '25 ноября 2017',
    name: 'Александр (г. Тула)',
    text: 'Хотелось бы выразить особую признательность фирме «Центр Дезинсекции» за помощь в решении нашей проблемы. Живём с женой в двухкомнатной квартире уже много лет и мучаемся от регулярного нашествия тараканов в наш дом. Своими силами уничтожить вредных насекомых в нашем жилище не получалось, пока соседи не посоветовали обратиться к профессионалам. Ребята быстро приехали по звонку и решили нашу проблему за час. Огромное спасибо.'
  },
  {
    date: '2 сентября 2017',
    name: 'Алёна г. Рязань',
    text: 'Вспоминая с ужасом время, когда приходилось лезть в погреб, где обитали крысы. Обратившись к вам, я не пожалела, сотрудники быстро уничтожили грызунов во всём подвале. Спасибо'
  },
  {
    date: '25 декабря 2017',
    name: 'Елена г. Новомосковск',
    text: 'Недавно купили небольшую квартиру, но радовались не долго, через месяц стали замечать укусы на теле, ужасом осознали, что это клопы. Мама увидела в интернете вашу рекламу и решила позвонить. Всё получилось, отлично, клопов уничтожили и цены довольно низкие. Спасибо фирме, помогла, буду рекомендовать вас.'
  },
  {
    date: '10 января 2018',
    name: 'Ольга г. Москва',
    text: 'Спасибо фирме «Центр Дезинсекции» за профессионализм и быстрое решение проблемы. Долго не могла избавиться от муравьёв, теперь остались только воспоминания. Молодцы!'
  },
  {
    date: '7 августа 2017',
    name: 'Дмитрий г. Венёв',
    text: 'Хочу выразить огромную благодарность вашей фирме, вы меня сильно выручили, уничтожив грызунов на моём складе. Если честно, думал они опять вернуться и головной боли прибавится, видимо ошибался, вы качественно сделали свою работу, отдельное спасибо Алексею за консультацию. Обращусь обязательно если что.'
  }
]

function onPrevRevClick(e) {
  if (currentRev === 0)
    currentRev = reviews.length - 1;
  else
    currentRev -- ;
  
    setRev();
}

function onNextRevClick(e) {
  if (currentRev === reviews.length - 1)
    currentRev = 0;
  else
    currentRev ++ ;

    setRev();
}

function setRev() {
  revTitle.textContent = reviews[currentRev].name;
  revText.textContent = reviews[currentRev].text;
  revDate.textContent = reviews[currentRev].date;
}