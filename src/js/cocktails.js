// реалізувати логіку малювання карток з файлу get-random-cocktails.js
// import { changeEvents } from './favor-cockt';
import { addToFavorites } from './favor-cockt';
import { getFavorites } from './favor-cockt';
import { saveFavorites } from './favor-cockt';
export const cocktailsList = document.querySelector('.cocktails__list');
cocktailsList.addEventListener('click', changeEvents);
import spriteUrl from '/img/sprite.svg';
import { checkElemInLocStor } from './check-elem-in-loc-stor';
const modalCocktBtnFav = document.querySelector('.modal-button-favorite');

function onModalCocktBtnFav(e) {
  const modalCocktailCard = document.querySelector('.js-modal-cocktails-item');
  const modalCocktailCardId = modalCocktailCard.getAttribute('id');
  const likeBtn = document.querySelector(
    `[data-cocktId = "${modalCocktailCardId}"]`
  );
  const isElemFav = checkElemInLocStor(modalCocktailCardId, 'modalCocktail');
  if (isElemFav) {
    modalCocktBtnFav.textContent = 'Remove from favorite';
    let favoriteListLocalStorage = getFavorites();

    favoriteListLocalStorage = favoriteListLocalStorage.filter(
      favorite => favorite.id !== modalCocktailCardId
    );
    saveFavorites(favoriteListLocalStorage);

    likeBtn.classList.add('add_favorites_js');
    likeBtn.classList.remove('remove_favorites_js');

    modalCocktBtnFav.textContent = 'Add to favorite';

    return;
  } else {
    modalCocktBtnFav.textContent = 'Add to favorite';
    let favoriteListLocalStorage = getFavorites();
    // ??
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
    }
    likeBtn.classList.remove('add_favorites_js');
    likeBtn.classList.add('remove_favorites_js');
    // ??
    modalCocktBtnFav.textContent = 'Remove from favorite';
    return;
  }
}

export function changeEvents(event) {
  const target = event.target;
  // console.log('виклик changeEvents');
  if (target.classList.contains('learnmore__btn')) {
    modalCocktBtnFav.addEventListener('click', onModalCocktBtnFav);
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

    favoriteListLocalStorage = favoriteListLocalStorage.filter(
      favorite => favorite.id !== favoriteCardIdRemove
    );

    saveFavorites(favoriteListLocalStorage);
    return;
  }

  addToFavorites(event);
  target.classList.remove('add_favorites_js');
  target.classList.add('remove_favorites_js');
}
