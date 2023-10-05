// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з інградієнтами. викликати функцію відмалювання карток інградієнтів render-ingredients-cards.js та передати в неї цей масив інградієнтів та контейнер в якому необхідно відмалювати картки
import axios from 'axios';
// import 'basiclightbox/dist/basiclightbox.min.css';
import * as basicLightbox from 'basiclightbox';
// import '../css/favor-ingred.css';
import { customPaginationElement } from './element-pagination-custom';
import { noResultFavorIngred } from './render/render-element-not-found';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cardContainerEl = document.querySelector('.favor-ingred__gallery');

const KEY_BASKET = 'basket';
const data = JSON.parse(localStorage.getItem(KEY_BASKET));
console.log(data);
const paginationRef = document.querySelector('#pagination-elements');

function onIngredLearnMoreBtnClick(e) {
  if (e.target.className !== 'card__close') {
    return;
  }

  // const cocktailsList = document.querySelector('.js-modal-cocktails');
  // const modalId = e.target.dataset.modalOpen;
  // const modalCardId = e.target.dataset.id;
  // const modal = document.getElementById(modalId);
  // modal.classList.remove('is-hidden');
  console.log('slkasdfg');
}
function onIngredTrashBtnClick(e) {
  if (e.target.className !== 'btn-svg__close') {
    return;
  }
  console.log('trash');
  console.log(e.target);
  const ingredDeleteCardId = e.target.getAttribute('data-ingred-trash-id');
  console.log(ingredDeleteCardId);
  let dataIngrLocStor = JSON.parse(localStorage.getItem(KEY_BASKET)) || [];
  if (dataIngrLocStor === 0) {
    noResultFavorIngred(cardContainerEl);
  }
  dataIngrLocStor = dataIngrLocStor.filter(
    favorite => favorite.id !== ingredDeleteCardId
  );
  localStorage.setItem(KEY_BASKET, JSON.stringify(dataIngrLocStor));
  const newDataIngr = JSON.parse(localStorage.getItem(KEY_BASKET)) || [];
  if (newDataIngr.length === 0) {
    noResultFavorIngred(cardContainerEl);
    return;
  }
  cardMarkupImg(newDataIngr, cardContainerEl);
}
cardContainerEl.addEventListener('click', onIngredTrashBtnClick);

cardContainerEl.addEventListener('click', onIngredLearnMoreBtnClick);

if (data.length > 0) {
  cardMarkupImg(data, cardContainerEl);
} else {
  noResultFavorIngred(cardContainerEl);
}

// Promise.all(
//   data.map(async id => {
//     const data = await fetchIngredient(id);
//     return data[0];
//   })
// ).then(data => {
//   console.log(data);
//   isPaginationRequired(data);
// });

function isPaginationRequired(data) {
  if (data.length === 0) {
    // заглушка
  } else if (data.length >= 6) {
    // array, containerPagination, containerCoctails
    paginationRef.classList.remove('visually-hidden');
    console.log('Викликаємо пагінатор');
    customPaginationElement(
      data,
      paginationRef,
      cardContainerEl,
      6,
      cardMarkupImg
    );
  } else {
    cardMarkupImg(data, cardContainerEl);
  }
}

async function fetchIngredient(id) {
  const response = await axios.get(`${BASE_URL}ingredients/${id}`);
  const data = response.data;
  return data;
}

function checkAlco(value) {
  return value.toLowerCase() === 'yes' ? 'Alcoholic' : 'Non-Alcoholic';
}

function trimText(text, maxLength) {
  let result;
  if (text.length > maxLength) {
    result = text.slice(0, maxLength) + '...';
  } else {
    result = text;
  }
  return result;
}

function cardMarkupImg(data, container) {
  const dataForRender = data
    .map(el => {
      return `
          <li class="favor-ingred__card-item change-theme" id="${el.id}">
            <h2 class="favor-ingred__title-name">${el.name}</h2>
            <p class="favor-ingred__text-alco">${checkAlco(el.alcohol)}</p>
            <p class="favor-ingred__text-descr">${trimText(
              el.description,
              139
            )}</p>
            <div class="card__button-icon">
              <button class="card__close" data-id="${
                el._id
              }" data-source="${el.description.replace(
        /['"]+/g,
        ''
      )}" type="button">learn more</button>
              <button class="btn-svg__close" data-ingred-trash-id = ${
                el.id
              } type="button">
                <svg class="favor-ingred__svg" data-id="${el.id}">
                  <use href="./img/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>
                  `;
    })
    .join('');
  container.innerHTML = dataForRender;
}

// Promise.all(
//   data.map(async id => {
//     const data = await fetchIngredient(id);
//     return data[0];
//   })
// ).then(data => {
//   console.log(data);
//   isPaginationRequired(data);
// });

function openModal(description) {
  const instance = basicLightbox.create(
    `
          <div class="modal-ingredients">
              <p>
                ${description}
              </p>
          </div>
        `
  );
  console.log(instance);
  instance.show();
}

function closeModal(evt) {
  if (evt.code === 'Escape') {
    this.close();
  }
}

// cardContainerEl.addEventListener('click', onClick);

async function onClick(event) {
  event.preventDefault();
  if (event.target.className.toString().includes('card__close')) {
    console.log(event.target);
    openModal(event.target.dataset.source);
  }

  if (event.target.classList.contains('favor-ingred__svg')) {
    data.splice(event.target.dataset.id, 1);
    localStorage.setItem(KEY_BASKET, JSON.stringify(data));
    const element = document.getElementById(event.target.dataset.id);
    console.log(element);
    element.remove();
  }
}
