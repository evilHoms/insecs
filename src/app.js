'use strict';

import './app.scss';

const state = {
  isMenu: false
};

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

const dropdownCloseBtn = document.querySelector('.choose-the-city__close');
dropdownCloseBtn.addEventListener('click', onCloseClick);

function onCloseClick(e) {
  const city = dropdown.querySelector('.selected').dataset.city;
  setDataFromCity(city);
  startingChooseTheCity.classList.add('hidden');
}

function setDataFromCity(city) {
  console.log(city);
  const topCity = document.querySelector('.top__city--text');

  switch(city) {
    case 'moscow':
      topCity.textContent = 'г. Москва';
      break;
    case 'tula':
      topCity.textContent = 'Тульская область';
      break;
    case 'razan':
      topCity.textContent = 'г. Рязань';
      break;
    case 'kaluga':
      topCity.textContent = 'г. Калуга';
      break;
  }
}