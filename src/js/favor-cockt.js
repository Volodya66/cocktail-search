// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з коктейлями. викликати функцію відмалювання карток та передати в неї цей масив коктейлів
// cocktailsList.addEventListener('click', changeEvents);
// import { cocktailsList } from './favor-cocktails-addListenerBtn';
import { checkElemInLocStor } from './check-elem-in-loc-stor';
import { noResultFavorCocktails } from './render/render-element-not-found';
import spriteUrl from '/img/sprite.svg';
import axios from 'axios';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1';
import { selectedIngredient } from './modal/modal-ingredient';
// import { addListenerToLearnMoreBtn } from './modal/modal-cocktail';
// LOCAL STORAGE GET AND SAVE
// let favorCock = getFavorites();
// console.log(favorCock);

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function saveFavorites(favorCock) {
  localStorage.setItem('favorites', JSON.stringify(favorCock));
}

export function addToFavorites(event) {
  const card = event.target.closest('.cocktails__item');
  if (card) {
    const id = card.getAttribute('id');
    const cocktailData = {
      id: id,
      name: card.querySelector('.cocktails__item__header').textContent,
      description: card.querySelector('.cocktails__item__description')
        .textContent,
      imageSrc: card.querySelector('.cocktails__item__img').src,
    };
    let favorCock = getFavorites();

    if (!favorCock.some(favor => favor.id === cocktailData.id)) {
      favorCock.push(cocktailData);
      saveFavorites(favorCock);
    }
  }
}

// FAVORITES COCKTAILS
try {
  const favorList = document.querySelector('.favor__list');
  const dataFavorCockt = getFavorites();

  if (dataFavorCockt.length > 0) {
    renderFavorCocktailsList(dataFavorCockt);
    // favorList.addEventListener('click', changeFavorEvents);
  } else {
    noResultFavorCocktails(favorList);
  }
  function renderFavorCocktailsList(arrayFavorCockt) {
    favorList.innerHTML = arrayFavorCockt
      .map(
        favorite => `
      <li class="favor__item cocktails__item change-theme" id=${favorite.id}>
        <img class="cocktails__item__img" loading="lazy" src=${favorite.imageSrc} alt=${favorite.name}>
        <h3 class="cocktails__item__header">${favorite.name}</h3>
        <p class="cocktails__item__description">${favorite.description}</p>
        <div class="cocktails__btn__container">
          <button type="button" class="learnmore__btn" data-id="${favorite.id}" data-modal-open="modal-cocktails">learn more</button>
          <button type="button" class="trash__btn svg__btn">
            <svg class="svg-icon svg-icon-trash">
              <use class="cocktails__svg" href="${spriteUrl}#icon-trash"></use>
            </svg>
          </button>
        </div>
      </li>
    `
      )
      .join('');
  }
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('[data-modal]');
      modal.classList.add('is-hidden');
    });
  });

  async function onBtnLoadMoreClick(e) {
    if (e.target.nodeName !== 'BUTTON' || !e.target.dataset.id) {
      return;
    }
    const cocktailsList = document.querySelector('.js-modal-cocktails');
    const modalId = e.target.dataset.modalOpen;
    const modalCardId = e.target.dataset.id;
    const modal = document.getElementById(modalId);
    modal.classList.remove('is-hidden');
    let response = await axios.get(
      `${BASE_URL}/cocktails/lookup/?id=${modalCardId}`
    );
    const cocktailDataClick = response.data;

    const ingredientsArr = [];
    const ingredientsId = [];
    cocktailDataClick[0].ingredients.forEach(element => {
      if (element.measure === undefined) {
        element.measure = '';
      }
      ingredientsArr.push(element.measure + ' ' + element.title);
      ingredientsId.push(element.ingredientId);
    });

    cocktailsList.innerHTML = cocktailDataClick
      .map(
        image => `
        <li class="js-modal-cocktails-item" id="${image._id}">
        <ul class="modal-cocktails-card-part-1 list">
          <li class="modal-cocktails-card-item">
            <div class="modal-cocktails-img-wrapper">
              <img
                class="modal-cocktails-img"
                src="${image.drinkThumb}"
                alt="${image.drink}"
                loading="lazy"
              />
            </div>
          </li>
          <li class="modal-cocktails-card-item">
            <h2 class="modal-cocktails-card-title">${image.drink}</h2>
            <h2 class="modal-cocktails-info-part-title">INGREDIENTS:</h2>
            <p class="visually-hidden modal-cocktail-item-description">${image.description}</p>
            <p class="modal-cocktails-info-part-undotitle">Per cocktail</p>
            <ul class="modal-cocktails-info-part-1-list list-cocktail-ingredients">
            </ul>
          </li>
        </ul>
        <div class="modal-cocktails-card-part-2">
          <h2 class="modal-cocktails-info-part-title">INSTRUCTIONS:</h2>
          <p class="modal-cocktails-info-part-2-text">${image.instructions}</p>
        </div>
        </li>
      `
      )
      .join('');

    const modalCocktBtnFav = document.querySelector('.modal-button-favorite');
    const modalCocktailCard = document.querySelector(
      '.js-modal-cocktails-item'
    );
    const modalContainer = document.querySelector('.wrapper-modal-cocktails');
    const modalCocktailCardId = modalCocktailCard.getAttribute('id');
    const isElemFav = checkElemInLocStor(modalCocktailCardId, 'modalCocktail');
    if (isElemFav) {
      modalCocktBtnFav.textContent = 'Remove from favorite';
    } else {
      modalCocktBtnFav.textContent = 'Add to favorite';
    }
    const ingredientsList = document.querySelector(
      '.modal-cocktails-info-part-1-list'
    );
    for (let i = 0; i < ingredientsArr.length; i++) {
      ingredientsList.insertAdjacentHTML(
        'afterbegin',
        `<li class="list-cocktail-ingredients-item" id=${ingredientsId[i]}>${ingredientsArr[i]}</li>`
      );
    }
    //?
    const listCocktail = document.querySelector('.list-cocktail-ingredients');

    listCocktail.addEventListener('click', selectedIngredient);

    modalContainer.addEventListener('click', onModalCocktBtnFav);

    // const modalCocktailElement = e.target.closest('.favor__item');

    // const modalCocktailElementId = modalCocktailElement.getAttribute('id');

    // let favoriteListLocalStorage = getFavorites();
    // favoriteListLocalStorage = favoriteListLocalStorage.filter(
    //   favorite => favorite.id !== modalCocktailElementId
    // );
    // saveFavorites(favoriteListLocalStorage);
    // renderFavorCocktailsList(favoriteListLocalStorage);
    // return;
    function onModalCocktBtnFav(e) {
      if (e.target.className !== 'modal-button modal-button-favorite') {
        return;
      }

      const modalCocktailCard = document.querySelector(
        '.js-modal-cocktails-item'
      );
      const modalCocktailCardId = modalCocktailCard.getAttribute('id');
      const isElemFav = checkElemInLocStor(
        modalCocktailCardId,
        'modalCocktail'
      );

      if (isElemFav) {
        modalCocktBtnFav.textContent = 'Remove from favorite';
        let favoriteListLocalStorage = getFavorites();
        favoriteListLocalStorage = favoriteListLocalStorage.filter(
          favorite => favorite.id !== modalCocktailCardId
        );
        saveFavorites(favoriteListLocalStorage);
        modalCocktBtnFav.textContent = 'Add to favorite';
        console.log(favoriteListLocalStorage);
        if (favoriteListLocalStorage.length === 0) {
          noResultFavorCocktails(favorList);
          return;
        }
        renderFavorCocktailsList(favoriteListLocalStorage);
        return;
      } else {
        modalCocktBtnFav.textContent = 'Add to favorite';
        let favoriteListLocalStorage = getFavorites();

        const card = modalCocktailCard;
        if (card) {
          const id = card.getAttribute('id');
          const cocktailData = {
            id: id,
            name: card.querySelector('.modal-cocktails-card-title').textContent,
            description: card.querySelector('.modal-cocktail-item-description')
              .textContent,
            imageSrc: card.querySelector('.modal-cocktails-img').src,
          };
          let favorCock = getFavorites();

          if (!favorCock.some(favor => favor.id === cocktailData.id)) {
            favorCock.push(cocktailData);
            saveFavorites(favorCock);
          }
          renderFavorCocktailsList(favorCock);
        }
        modalCocktBtnFav.textContent = 'Remove from favorite';

        // ??
        return;
      }
    }
    //?
  }
  function onTrashBtnClick(e) {
    if (e.target.className !== 'trash__btn svg__btn') {
      return;
    }

    const modalCocktailElement = e.target.closest('.favor__item');

    const modalCocktailElementId = modalCocktailElement.getAttribute('id');

    let favoriteListLocalStorage = getFavorites();
    favoriteListLocalStorage = favoriteListLocalStorage.filter(
      favorite => favorite.id !== modalCocktailElementId
    );
    saveFavorites(favoriteListLocalStorage);
    if (favoriteListLocalStorage.length === 0) {
      noResultFavorCocktails(favorList);
      return;
    }
    renderFavorCocktailsList(favoriteListLocalStorage);
    return;
  }
  const trashBtn = document.querySelectorAll('.trash__btn');
  favorList.addEventListener('click', onTrashBtnClick);
  // trashBtn.forEach(el => {
  //   el.addEventListener('click', onTrashBtnClick);
  // });
  favorList.addEventListener('click', onBtnLoadMoreClick);
} catch {
  console.log('index.html');
}

function changeFavorEvents(event) {
  const target = event.target;
  if (target.classList.contains('learnmore__btn')) {
    // console.log('Open modal');
  } else if (target.classList.contains('trash__btn')) {
    removeFromFavor(event);
  }
}

function removeFromFavor(event) {
  const favorcard = event.target.closest('.favor__item');
  const id = favorcard.getAttribute('id');

  favorCock = favorCock.filter(favorite => favorite.id !== id);
  saveFavorites(favorCock);

  renderFavorCocktailsList(favorCock);
}
