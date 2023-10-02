// реалізувати іменований експорт функції, яка буде відмальовувати зображення та текст. цю функцію будуть використовувати, якшо довжина масиву коктейлів або інградієнтів дорівнює 0. в параметри цій функції будуть приходити булева змінна isCocktail та контейнер, в якому треба малювати розмітку, якщо булева змінна true, то розмітку робити для незнайденого коктеля, якщо false, то розмітку робити для незнайденого інградієнта

//картки "нема фаворит коктейлів і фаворит інгредієнтів"

//<div class="no"></div>

import noImg from '../../img/rafiki_not.png';

const noResultContainerEl = document.querySelector('.no');

function noresult() {
  if (noFavoriteCocktails) {
    noResultCocktails;
  }
  if (noFavoriteIngredients) {
    noResultIngredients;
  }
}

const noResultCocktails = `
    <div class="no_result_container">
      <div class="no_result">
        <h2 class="no_result_title">Favorite cocktails</h2>
        <div class="no_result_center">
          <img src="${noImg}"
            class="no_result_img"
            alt="no cocktails" 
          />
          <p class="no_result_text">
            You haven't added any<br /><span class="no_result_fc"
              >favorite cocktails</span
            >
            yet
          </p>
        </div>
      </div>
</div>`;

const noResultIngredients = `<div class="no_result_container">
      <div class="no_result">
        <h2 class="no_result_title">Favorite ingredients</h2>
        <div class="no_result_center">
          <img src="${noImg}"
            class="no_result_img"
            alt="no Ingredients"
          />
          <p class="no_result_text">
            You haven't added any<br /><span class="no_result_fc"
              >favorite ingredients</span
            >
            yet
          </p>
        </div>
      </div>
</div>`;

// noResultContainerEl.innerHTML = noResultCocktails;
// noResultContainerEl.innerHTML = noResultIngredients;
