// реалізувати запит на сервер. З файлу search-query треба імпортувати рядок для пошукового запиту. Зробити іменований експорт масиву з об'єктами коктейлів, відповідно до пошукового запиту

import { noResultAll } from '../render/render-element-not-found';
const cocktailsList = document.querySelector('.cocktails__list');

export default function getCocktailsBySearch(search) {
  return fetch(
    `https://drinkify.b.goit.study/api/v1/cocktails/search/?${search}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response);
      }
      return response.json();
    })
    .catch(() => {
      const cocktailsTitle = document.querySelector('.search__title');
      cocktailsTitle.classList.add('visually-hidden');
      noResultAll(cocktailsList);
    });
}
