// реалізувати іменований експорт функції, яка буде відмальовувати зображення та текст. цю функцію будуть використовувати, якшо довжина масиву коктейлів або інградієнтів дорівнює 0. в параметри цій функції будуть приходити булева змінна isCocktail та контейнер, в якому треба малювати розмітку, якщо булева змінна true, то розмітку робити для незнайденого коктеля, якщо false, то розмітку робити для незнайденого інградієнта

//вставка в сторінку "not founds"
// <div class="noAll"></div>
import noImg from '../../img/rafiki_not.png';

const noAllEl = document.querySelector('.noAll');
export function noResultAll(container) {
  container.innerHTML = `<div class="no_res_cent">
  <img
    src="${noImg}"
    class="no_res_img"
    alt="no cocktails"
  />
  <p class="no_res_text">
    Sorry, we <span class="no_res_fc">didn't find</span> any <br />
    cocktail for you
  </p>
</div>`;
}
// const noResultAll = `<div class="no_res_cent">
//   <img
//     src="${noImg}"
//     class="no_res_img"
//     alt="no cocktails"
//   />
//   <p class="no_res_text">
//     Sorry, we <span class="no_res_fc">didn't find</span> any <br />
//     cocktail for you
//   </p>
// </div>`;
// noAllEl.innerHTML = noResultAll;

//2 різні картки "нема фаворит коктейлів і фаворит інгредієнтів"
//<div class="no"></div>
// import noImg from '../../img/rafiki_not.png';

const noResultContainerEl = document.querySelector('.no');
export function noResultCocktails(container) {
  container.innerHTML = `
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
}
function noresult() {
  if (noFavoriteCocktails) {
    noResultCocktails;
  }
  if (noFavoriteIngredients) {
    noResultIngredients;
  }
}

export function noResultFavorCocktails(container) {
  container.innerHTML = `
    <div class="no_result_container change-theme">
      <div class="no_result">
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
}

// const noResultCocktails = ;

export function noResultFavorIngred(container) {
  container.innerHTML = `<div class="no_result_container">
      <div class="no_result">
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
}
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
