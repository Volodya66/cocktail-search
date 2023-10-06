// реалізувати функцію пагінації масива, який передається при виклику функції. також в параметри передати контейнер в якому будуть картки для пагінації
import getCocktailsBySearch from './fetch/get-cocktails-by-search';
import { renderingCardDependency } from './fetch/get-random-cockt';
import { renderCocktailsList } from './render/render-coctails-cards';

const perPageCards = renderingCardDependency();
const cocktailsContainerRef = document.querySelector('.cocktails__list');
// const paginationRef = document.querySelector('#pagination-elements');
// let cocktailsArray = await getCocktailsBySearch('a');

export let arrayOfArrays = [];
// console.log(cocktailsArray);

export function paginationElement(
  array,
  containerPagination,
  containerCocktails
) {
  let counter = 1;
  arrayOfArrays = [];
  for (
    counter = 0;
    counter < Math.ceil(array.length / perPageCards);
    counter += 1
  ) {
    const perPageArray = array.slice(
      counter * perPageCards,
      (counter + 1) * perPageCards
    );
    arrayOfArrays.push(perPageArray);
  }
  // console.log('Малюємо першу сторінку');
  renderCocktailsList(arrayOfArrays[0], cocktailsContainerRef);
  renderPaginationNumbers(
    arrayOfArrays,
    containerPagination,
    containerCocktails
  );
}
function onPaginationBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  renderCocktailsList(
    arrayOfArrays[e.target.textContent - 1],
    cocktailsContainerRef
  );

  // console.log(`Малюємо ${e.target.textContent} сторінку`);
  // console.log(arrayOfArrays[e.target.textContent - 1]);
}
function renderPaginationNumbers(arrayOfArrays, paginationRef, cocktailsRef) {
  let markup = [];
  for (let i = 0; i <= arrayOfArrays.length - 1; i += 1) {
    markup.push(
      `<button class="js-pagination-btn" type="button" id="js-pagination-btn">${
        i + 1
      }</button>`
    );
  }
  paginationRef.innerHTML = markup.join('');
  paginationRef.addEventListener('click', onPaginationBtnClick);
}
