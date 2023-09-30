// реалізувати функцію пагінації масива, який передається при виклику функції. також в параметри передати контейнер в якому будуть картки для пагінації
let cocktailsArray = [];

function renderingCardDependency() {
  let widthWindowUser = document.documentElement.clientWidth;
  let requestCards = widthWindowUser > 1280 ? 9 : 8;
  return requestCards;
}
function getCocktailsBySearch(search) {
  return fetch(
    `https://drinkify.b.goit.study/api/v1/cocktails/search/?${search}`
  )
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          console.log('render not found element');
        }
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error.status);
    });
}

cocktailsArray = await getCocktailsBySearch('a');
const coctailsRef = document.querySelector('#cocktails');
paginationElement(cocktailsArray, coctailsRef);

function paginationElement(array, container) {
  const perPageCards = renderingCardDependency();
  console.log(array);
  let arrayOfArrays = [];
  let counter = 1;

  for (counter = 0; counter < array.length / perPageCards; counter += 1) {
    const perPageArray = array.slice(
      counter * perPageCards,
      (counter + 1) * perPageCards
    );
    arrayOfArrays.push(perPageArray);
  }
  console.log(arrayOfArrays);
  // console.log(perPageCards);
  // console.log(array, container);
}
