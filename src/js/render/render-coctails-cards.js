// написати функцію яка буде відмальовувати картки коктейлів. З файла user-screen-width-follower.js взяти кількість карток, які необхідно намалювати, відповідно до ширини екрану. В параметри функції буде приходити масив з об'єктами коктейлів та посилання на елемент в якому ці картки необхідно намалювати. Зробити іменований експорт цієї функції, для її перевикористання. у разі якщо довжина масиву більша за число карток, які можна намалювати, відповідно до ширини екрану, викликати функцію пагінації.Картки мають бути тегами li, тому що малюватись вони будуть в тезі ul
// let query ='';

// const BASE_URL = 'https://drinkify.b.goit.study/api/v1/cocktails/search/';

// function fetchImage() {
// if(query.length===1){
//     return fetch(`${BASE_URL}?f=${query}`)
//     .then(response => {
//       return response.json();
//     })
// }
//     return fetch(`${BASE_URL}?s=${query}`)
//       .then(response => {
//         return response.json();
//       })
//       .catch(error => {
//         throw new Error;
//       });
//   }

// const searchForm = document.querySelector('.search__form');
const cocktailsList = document.querySelector('.cocktails__list');
const titleRemove = document.querySelector('.search__title');
const learnMoreBtn = document.querySelectorAll('.learnmore__btn');
const svg = document.querySelectorAll('.cocktails__svg');

const itemBtnContainer = document.querySelectorAll(
  '.cocktails__btn__container'
);

// titleRemove.style.display = 'none';

// searchForm.addEventListener('submit', createImgCards);

// if (itemBtnContainer) {
//   itemBtnContainer.forEach(button => {
//   button.addEventListener('click', changeEvents);
// })};

// async function createImgCards(event) {
// event.preventDefault();
// query = event.currentTarget.elements.query.value.trim();

// clearCocktailsList();

// try {
// const data = await fetchImage();
// data.length = renderingCardDependency();
// titleRemove.style.display = 'block';
// renderCocktailsList(data);
// }
// catch (error) {
// console.log(error.message);
// }
// }

export function renderCocktailsList(images, container) {
  container.innerHTML = images
    .map(
      image => `
<li class="cocktails__item change-theme" id = ${image._id}>
<img class="cocktails__item__img" loading="lazy" src=${image.drinkThumb} alt=${image.drink}>
<h3 class="cocktails__item__header">${image.drink}</h3>
<p class="cocktails__item__description">${image.description}</p>
<div class="cocktails__btn__container">
<button type="button" class="learnmore__btn">learn more</button>
<button type="button"  class="svg__btn"> 
 <svg class="svg-heart">
<use class="cocktails__svg add_favorites_js" href="./img/sprite.svg#icon-heart"></use>
</svg>
</button>
</div> 
</li>
`
    )
    .join('');
}
function renderingCardDependency() {
  let widthWindowUser = document.documentElement.clientWidth;
  let requestCards = widthWindowUser > 1280 ? 9 : 8;
  return requestCards;
}

function clearCocktailsList() {
  cocktailsList.innerHTML = '';
}

function changeEvents(event) {
  const target = event.target;
  if (target.classList.contains('learnmore__btn')) {
    console.log('Open modal');
  } else if (target.classList.contains('svg__btn')) {
    addToFavorites();
    if (addToFavorites) {
      svg.classList.remove('.add_favorites_js');
      svg.classList.add('.remove_favorites_js');
    }
    console.log('Add to favorites');
  }
}

function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(event) {
  const card = event.target.parentElement;
  const cocktailData = {
    id: card.querySelector('#id').textContent,
    name: card.querySelector('.cocktails__item__header').textContent,
    description: card.querySelector('.cocktails__item__description')
      .textContent,
    imageSrc: card.querySelector('.cocktails__item__img').src,
  };

  const favorites = getFavorites();

  if (!favorites.includes(cocktailData)) {
    favorites.push(cocktailData);
  }
  saveFavorites(favorites);
}
