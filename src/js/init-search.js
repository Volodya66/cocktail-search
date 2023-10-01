import getCocktailsBySearch from './fetch/get-cocktails-by-search';

const searchInput = document.querySelector('.search-input');
const lettersContainer = document.querySelector('.container-letters');

lettersContainer.addEventListener('click', onButtonClick);
lettersContainer.addEventListener('change', onSelectChange);

searchInput.addEventListener('keyup', onChangeInput);

function onChangeInput(event) {
  event.preventDefault();

  if (event.key === 'Enter') {
    const inputValue = searchInput.value.trim();
    searchInput.value = '';
    if (inputValue) {
      getCocktailsBySearch(`s=${inputValue}`);
    }
  }
}

function onButtonClick(event) {
  if (event.target.tagName === 'BUTTON') {
    getCocktailsBySearch(`f=${event.target.innerText}`);
  }
}

function onSelectChange(event) {
  if (event.target.tagName === 'SELECT') {
    getCocktailsBySearch(`f=${event.target.value}`);
  }
}
