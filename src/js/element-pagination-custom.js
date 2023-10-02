// реалізувати функцію пагінації масива, який передається при виклику функції. також в параметри передати контейнер в якому будуть картки для пагінації

export let arrayOfArrays = [];
// console.log(cocktailsArray);

export function customPaginationElement(
  array,
  containerPagination,
  containerElementsRef,
  perPageCards = 6,
  renderFuntion
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
  console.log('Малюємо першу сторінку');
  renderFuntion(arrayOfArrays[0], containerElementsRef);

  const onPaginationBtnClick = e => {
    containerElementsRef.innerHTML = '';
    renderFuntion(
      arrayOfArrays[e.target.textContent - 1],
      containerElementsRef
    );

    console.log(`Малюємо ${e.target.textContent} сторінку`);
    // console.log(arrayOfArrays[e.target.textContent - 1]);
  };

  renderPaginationNumbers(
    arrayOfArrays,
    containerPagination,
    onPaginationBtnClick
  );
}

function renderPaginationNumbers(
  arrayOfArrays,
  paginationRef,
  onPaginationClick
) {
  let markup = [];
  for (let i = 0; i <= arrayOfArrays.length - 1; i += 1) {
    markup.push(
      `<button class="js-pagination-btn" type="button" id="js-pagination-btn">${
        i + 1
      }</button>`
    );
  }
  paginationRef.innerHTML = markup.join('');
  paginationRef.addEventListener('click', onPaginationClick);
}
