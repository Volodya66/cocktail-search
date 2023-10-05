// реалізувати реалізувати відкриття та закриття модалки.  функцію відмалювання розмітки модального вікна інградіента, з файлів element-add-to-local-storage.js та element-remove-from-local-storage імпортувати функції для додавання та видалення елементів local storage для додавання та видалення з улюбленого

import axios from 'axios';
import { markupModalIngredients } from '../render/render-modal-ingred';

const BASE_URL_INGREDIENT = 'https://drinkify.b.goit.study/api/v1/ingredients/';
const divModalIngredient = document.querySelector('.modal-ingredient-details');
const modal = document.querySelector('.modal-ingredients');
const modalCocktail = document.querySelector('.wrapper-modal-cocktails');
import { checkElemInLocStor } from '../check-elem-in-loc-stor';
// const listCocktail = document.querySelector('.list-cocktail-ingredients');
// listCocktail.addEventListener('click', selectedIngredient)

async function selectedIngredient(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }

  openModal();
  divModalIngredient.innerHTML = '';
  // openModal();

  // const btnModalIngredientBack = document.querySelector('.modal-ingredient-back')
  let idIngredient = evt.target.getAttribute('id');
  // console.log(idIngredient);
  divModalIngredient.setAttribute('data-modal-indr-id', idIngredient);
  let dataSearchParam = await ingredientSearchRequest(idIngredient);
  let markup = markupModalIngredients(dataSearchParam);
  // ? додавання в до діва розмітки
  divModalIngredient.insertAdjacentHTML('afterbegin', markup);

  const modalIngredientActionBtn = document.querySelector(
    '.modal-ingredient-add'
  );
  modalIngredientActionBtn.addEventListener(
    'click',
    onModalIndredActionBtnClick
  );

  const closeModalButton = document.querySelector('.js-close-btn');
  const closeModalBtnTwo = document.querySelector('.js-close-btn-two');
  // console.log(closeModalButton)
  closeModalBtnTwo.addEventListener('click', closeModalIngredient);
  closeModalButton.addEventListener('click', closeModalIngredient);
  function closeModalIngredient() {
    closeModal();
  }
}

function onModalIndredActionBtnClick(e) {
  const modalIngredCardRef = document.querySelector(
    '.modal-ingredient-details'
  );
  const modalIngredCardRefId =
    modalIngredCardRef.getAttribute('data-modal-indr-id');

  const isElemInLocStor = checkElemInLocStor(
    modalIngredCardRefId,
    'favorIngred'
  );

  const indgredData = {
    id: modalIngredCardRefId,
    name: modalIngredCardRef.querySelector('.modal-ingredient-title')
      .textContent,
    description:
      modalIngredCardRef.querySelector('.modal-ingredient-text').textContent ||
      '',
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

  let dataFavorIndgrLocStor = JSON.parse(localStorage.getItem('basket')) || [];
  const modalIngredientActionBtn = document.querySelector(
    '.modal-ingredient-add'
  );

  if (isElemInLocStor) {
    modalIngredientActionBtn.textContent = 'add to favorite';

    dataFavorIndgrLocStor = dataFavorIndgrLocStor.filter(
      favorite => favorite.id !== modalIngredCardRefId
    );
    localStorage.setItem('basket', JSON.stringify(dataFavorIndgrLocStor));

    return;
  }

  if (!dataFavorIndgrLocStor.some(favor => favor.id === indgredData.id)) {
    dataFavorIndgrLocStor.push(indgredData);
    localStorage.setItem('basket', JSON.stringify(dataFavorIndgrLocStor));
    modalIngredientActionBtn.textContent = 'remove from favorite';
  }
  // console.log(checkElemInLocStor(modalIngredCardRefId, 'favorIngred'));
}

async function ingredientSearchRequest(searchParamId) {
  try {
    let responseForIngr = await axios.get(
      `${BASE_URL_INGREDIENT}${searchParamId}`
    );
    // console.log(responseForIngr.data)
    return responseForIngr.data;
  } catch {
    console.log(error.message);
  }
}

function openModal() {
  const cocktailsModalCloseBtn = document.querySelector('.cocktails-close');
  cocktailsModalCloseBtn.setAttribute('disabled', 'true');
  modalCocktail.classList.add('semi-hidden');
  modal.classList.remove('is-hidden');
}

function closeModal() {
  const cocktailsModalCloseBtn = document.querySelector('.cocktails-close');
  cocktailsModalCloseBtn.removeAttribute('disabled');
  modal.classList.add('is-hidden');
  modalCocktail.classList.remove('semi-hidden');
}

export { selectedIngredient };
