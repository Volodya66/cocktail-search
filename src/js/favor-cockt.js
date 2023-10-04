// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з коктейлями. викликати функцію відмалювання карток та передати в неї цей масив коктейлів
// cocktailsList.addEventListener('click', changeEvents);
import { cocktailsList } from './favor-cocktails-addListenerBtn';
import { checkElemInLocStor } from './check-elem-in-loc-stor';
const modalCocktBtnFav = document.querySelector('.modal-button-favorite');

function onModalCocktBtnFav(e) {
  const modalCocktailCard = document.querySelector('.js-modal-cocktails-item');
  const modalCocktailCardId = modalCocktailCard.getAttribute('id');
  const isElemFav = checkElemInLocStor(modalCocktailCardId, 'modalCocktail');
  if (isElemFav) {
    modalCocktBtnFav.textContent = 'Remove from favorite';
    let favoriteListLocalStorage = getFavorites();

    console.log(favoriteListLocalStorage.length);

    favoriteListLocalStorage = favoriteListLocalStorage.filter(
      favorite => favorite.id !== modalCocktailCardId
    );
    saveFavorites(favoriteListLocalStorage);
    console.log(favoriteListLocalStorage.length);
    return;
  } else {
    modalCocktBtnFav.textContent = 'Add to favorite';
  }
}
export function changeEvents(event) {
  const target = event.target;
  // console.log('виклик changeEvents');
  if (target.classList.contains('learnmore__btn')) {
    modalCocktBtnFav.addEventListener('click', onModalCocktBtnFav);

    console.log('Open modal');
  }
  if (!target.classList.contains('svg__btn')) {
    return;
  }
  if (target.classList.contains('remove_favorites_js')) {
    target.classList.add('add_favorites_js');
    target.classList.remove('remove_favorites_js');

    const favorcard = target.closest('.cocktails__item');
    const favoriteCardIdRemove = favorcard.getAttribute('id');

    let favoriteListLocalStorage = getFavorites();

    console.log(favoriteListLocalStorage.length);

    favoriteListLocalStorage = favoriteListLocalStorage.filter(
      favorite => favorite.id !== favoriteCardIdRemove
    );

    saveFavorites(favoriteListLocalStorage);
    console.log(favoriteListLocalStorage.length);
    return;
  }

  addToFavorites(event);
  target.classList.remove('add_favorites_js');
  target.classList.add('remove_favorites_js');
}

// LOCAL STORAGE GET AND SAVE
// let favorCock = getFavorites();
// console.log(favorCock);

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorCock) {
  localStorage.setItem('favorites', JSON.stringify(favorCock));
}

function addToFavorites(event) {
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

const favorList = document.querySelector('.favor__list');

function renderFavorCocktailsList() {
  favorList.innerHTML = favorCock
    .map(
      favorite => `
    <li class="favor__item" id=${favorite.id}>
      <img class="cocktails__item__img" src=${favorite.imageSrc} alt=${favorite.name}>
      <h3 class="cocktails__item__header">${favorite.name}</h3>
      <p class="cocktails__item__description">${favorite.description}</p>
      <div class="cocktails__btn__container">
        <button type="button" class="learnmore__btn">learn more</button>
        <button type="button" class="trash__btn">
          <svg class="svg-icon">
            <use class="cocktails__svg" href="img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      </div>
    </li>
  `
    )
    .join('');
}

// renderFavorCocktailsList(favorCock);

// favorList.addEventListener('click', changeFavorEvents);

function changeFavorEvents(event) {
  const target = event.target;
  if (target.classList.contains('learnmore__btn')) {
    console.log('Open modal');
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
