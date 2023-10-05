// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з інградієнтами. викликати функцію відмалювання карток інградієнтів render-ingredients-cards.js та передати в неї цей масив інградієнтів та контейнер в якому необхідно відмалювати картки
import axios from 'axios';
// import 'basiclightbox/dist/basiclightbox.min.css';
import * as basicLightbox from 'basiclightbox';
// import '../css/favor-ingred.css';
import { customPaginationElement } from './element-pagination-custom';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cardContainerEl = document.querySelector('.favor-ingred__gallery');

const KEY_BASKET = 'basket';
const data = JSON.parse(localStorage.getItem(KEY_BASKET));
console.log(data);
const paginationRef = document.querySelector('#pagination-elements');

cardMarkupImg(data, cardContainerEl);
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
          <li class="favor-ingred__card-item" id="${el._id}">
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
              <button class="btn-svg__close" type="button">
                <svg class="favor-ingred__svg" data-id="${el._id}">
                  <use href="./img/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>
                  `;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', dataForRender);
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
