// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з інградієнтами. викликати функцію відмалювання карток інградієнтів render-ingredients-cards.js та передати в неї цей масив інградієнтів та контейнер в якому необхідно відмалювати картки
import axios from 'axios';
import spriteUrl from '/img/sprite.svg';
// import 'basiclightbox/dist/basiclightbox.min.css';
import * as basicLightbox from 'basiclightbox';
// import '../css/favor-ingred.css';
import { customPaginationElement } from './element-pagination-custom';
import { noResultFavorIngred } from './render/render-element-not-found';
import { markupModalIngredients } from './render/render-modal-ingred';
import { checkElemInLocStor } from './check-elem-in-loc-stor';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cardContainerEl = document.querySelector('.favor-ingred__gallery');
const modal = document.querySelector('.modal-cocktails');

const KEY_BASKET = 'basket';
const data = JSON.parse(localStorage.getItem(KEY_BASKET));
const paginationRef = document.querySelector('#pagination-elements');

if (data.length > 0) {
  cardMarkupImg(data, cardContainerEl);
} else {
  noResultFavorIngred(cardContainerEl);
}
function onIngredLearnMoreBtnClick(e) {
  if (e.target.className !== 'card__close') {
    return;
  }
  const ingredList = document.querySelector('.favor-ingred__gallery');
  modal.classList.remove('is-hidden');
  const modalId = e.target
    .closest('.favor-ingred__card-item')
    .getAttribute('id');
  const elementFindId = data.filter(el => el.id === modalId);

  const modalIngredContainer = document.querySelector(
    '.js-modal-cocktails-div'
  );

  // console.log(elementFindId);
  function renderMarkupElement(element, container) {
    container.innerHTML = element
      .map(
        ({ id, type, name, description, abv, country, flavour, alcohol }) => {
          abv = abv || 'Not defined, so you will have to taste!';
          country = country || 'There is no country of origin';
          flavour = flavour || 'Not specified';
          return `
      <p class="visually-hidden " data-modal-indredient-id = "${id}"></p>
           <button class="close-modal-cocktails js-close-btn" data-modal-close-ingr data-modal-close>
        <svg class="svg-close-modal-cocktails" width="22" height="22">
          <use href="${spriteUrl}#icon-close"></use>
        </svg>
      </button>
      <h2 class="modal-ingredient-title">${name}</h2>
      <p class="modal-ingr-alco visually-hidden" data-alco = "${alcohol}"></p>
      <p class="modal-ingredient-type">${type}</p>
      <span class="lin"></span>
      <p class="modal-ingredient-text"><span class="modal-ingredient-span-black">${name}</span>: ${description}</p>
      <ul class="modal-ingredient-list-properties">
        <li class="modal-ingredient-list-item" data-modal-ingr-type = "${type}">Type:${type}</li>
        <li class="modal-ingredient-list-item" data-modal-ingr-country = "${country}">Country of origin:${country}</li>
        <li class="modal-ingredient-list-item modal-ingred" data-modal-ingr-abv = "${abv}">Alcohol by volume:${abv}</li>
        <li class="modal-ingredient-list-item" data-modal-ingr-flav = "${flavour}">Flavour:${flavour}</li>
      </ul>
          `;
        }
      )
      .join('');
  }

  renderMarkupElement(elementFindId, modalIngredContainer);
  const modalIngredientActionBtn = document.querySelector(
    '.modal-button-favorite'
  );
  modalIngredientActionBtn.textContent = 'remove from favorite';

  function onModalIndredActionBtnClick(e) {
    const modalIngredCardRef = document.querySelector(
      '.js-modal-cocktails-div'
    );
    const elementGetId = document
      .querySelector('[data-modal-indredient-id]')
      .getAttribute('data-modal-indredient-id');

    const isElemInLocStor = checkElemInLocStor(elementGetId, 'favorIngred');
    // console.log(isElemInLocStor);

    const indgredData = {
      id: elementGetId,
      name: modalIngredCardRef.querySelector('.modal-ingredient-title')
        .textContent,
      description:
        modalIngredCardRef.querySelector('.modal-ingredient-text')
          .textContent || '',
      alcohol: modalIngredCardRef
        .querySelector('[data-alco]')
        .getAttribute('data-alco'),
      type: modalIngredCardRef
        .querySelector('[data-modal-ingr-type]')
        .getAttribute('data-modal-ingr-type'),
      country: modalIngredCardRef
        .querySelector('[data-modal-ingr-country]')
        .getAttribute('data-modal-ingr-country'),
      abv: modalIngredCardRef
        .querySelector('[data-modal-ingr-abv]')
        .getAttribute('data-modal-ingr-abv'),
      type: modalIngredCardRef
        .querySelector('[data-modal-ingr-flav]')
        .getAttribute('data-modal-ingr-flav'),
    };
    let dataFavorIndgrLocStor =
      JSON.parse(localStorage.getItem('basket')) || [];
    // console.log(dataFavorIndgrLocStor);
    const modalIngredientActionBtn = document.querySelector(
      '.modal-button-favorite'
    );

    if (isElemInLocStor) {
      modalIngredientActionBtn.textContent = 'add to favorite';

      dataFavorIndgrLocStor = dataFavorIndgrLocStor.filter(
        favorite => favorite.id !== elementGetId
      );
      localStorage.setItem('basket', JSON.stringify(dataFavorIndgrLocStor));
      if (dataFavorIndgrLocStor.length > 0) {
        cardMarkupImg(dataFavorIndgrLocStor, cardContainerEl);
      } else {
        noResultFavorIngred(cardContainerEl);
      }

      return;
    }
    if (!isElemInLocStor) {
      modalIngredientActionBtn.textContent = 'remove from favorite';

      dataFavorIndgrLocStor.push(indgredData);
      localStorage.setItem('basket', JSON.stringify(dataFavorIndgrLocStor));
      modalIngredientActionBtn.textContent = 'remove from favorite';
      if (dataFavorIndgrLocStor.length > 0) {
        cardMarkupImg(dataFavorIndgrLocStor, cardContainerEl);
      } else {
        noResultFavorIngred(cardContainerEl);
      }
      return;
    }
  }

  modalIngredientActionBtn.addEventListener(
    'click',
    onModalIndredActionBtnClick
  );
  // console.log(modalIngredientActionBtn);

  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('[data-modal]');
      modal.classList.add('is-hidden');
    });
  });

  // const modalCardId = e.target.dataset.id;
  // const modal = document.getElementById(modalId);
  // modal.classList.remove('is-hidden');
  // console.log('slkasdfg');
}
function onIngredTrashBtnClick(e) {
  if (e.target.className !== 'btn-svg__close') {
    return;
  }
  const ingredDeleteCardId = e.target.getAttribute('data-ingred-trash-id');
  // console.log(ingredDeleteCardId);
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
    // console.log('Викликаємо пагінатор');
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
                  <use href="${spriteUrl}#icon-trash"></use>
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
  // console.log(instance);
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
    // console.log(event.target);
    openModal(event.target.dataset.source);
  }

  if (event.target.classList.contains('favor-ingred__svg')) {
    data.splice(event.target.dataset.id, 1);
    localStorage.setItem(KEY_BASKET, JSON.stringify(data));
    const element = document.getElementById(event.target.dataset.id);
    // console.log(element);
    element.remove();
  }
}
