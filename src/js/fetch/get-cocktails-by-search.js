// реалізувати запит на сервер. З файлу search-query треба імпортувати рядок для пошукового запиту. Зробити іменований експорт масиву з об'єктами коктейлів, відповідно до пошукового запиту

export default function getCocktailsBySearch(search) {
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
