import getCocktailsBySearch from './fetch/get-cocktails-by-search';
import { renderCocktailsList } from './render/render-coctails-cards';
import { renderingCardDependency } from './fetch/get-random-cockt';
import { paginationElement } from './element-pagination';
import { noResultAll } from './render/render-element-not-found';
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const lettersContainer = document.querySelector('.container-letters');
const cocktailsList = document.querySelector('.cocktails__list');
const paginationRef = document.querySelector('#pagination-elements');
const cocktailsTitle = document.querySelector('.search__title');
const screenWidth = renderingCardDependency();
lettersContainer.addEventListener('click', onButtonClick);
lettersContainer.addEventListener('change', onSelectChange);

searchForm.addEventListener('submit', onChangeInput);
async function isPaginationRequired(data) {
  if (!data) {
    return;
  }
  if (data.length > screenWidth) {
    // array, containerPagination, containerCoctails
    cocktailsTitle.innerHTML = 'Searching results';
    paginationRef.classList.remove('visually-hidden');
    console.log('Викликаємо пагінатор');
    paginationElement(data, paginationRef, cocktailsList);
  } else if (data.length <= screenWidth) {
    paginationRef.classList.add('visually-hidden');
    paginationRef.innerHTML = '';
    renderCocktailsList(data, cocktailsList);
  }
}
async function onChangeInput(event) {
  event.preventDefault();
  // console.log(event);
  const inputValue = searchInput.value.trim();
  searchInput.value = '';
  if (inputValue) {
    const data = await getCocktailsBySearch(`s=${inputValue}`);
    isPaginationRequired(data);
  }
  //
  // if (event.key === 'Enter') {
  //   const inputValue = searchInput.value.trim();
  //   searchInput.value = '';
  //   if (inputValue) {
  //     getCocktailsBySearch(`s=${inputValue}`);
  //   }
  // }
}

async function onButtonClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const data = await getCocktailsBySearch(`f=${event.target.innerText}`);
    // console.log(data);
    isPaginationRequired(data);
  }
}

async function onSelectChange(event) {
  if (event.target.tagName === 'SELECT') {
    const data = await getCocktailsBySearch(`f=${event.target.value}`);
    isPaginationRequired(data);
  }
}
