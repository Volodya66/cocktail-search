// написати функцію яка буде відмальовувати картки коктейлів. З файла user-screen-width-follower.js взяти кількість карток, які необхідно намалювати, відповідно до ширини екрану. В параметри функції буде приходити масив з об'єктами коктейлів та посилання на елемент в якому ці картки необхідно намалювати. Зробити іменований експорт цієї функції, для її перевикористання. у разі якщо довжина масиву більша за число карток, які можна намалювати, відповідно до ширини екрану, викликати функцію пагінації.Картки мають бути тегами li, тому що малюватись вони будуть в тезі ul
import spriteUrl from '/img/sprite.svg';
import { checkElemInLocStor } from '../check-elem-in-loc-stor';
export function renderCocktailsList(images, container) {
  container.innerHTML = images
    .map(
      image => `
<li class="cocktails__item change-theme" id = ${image._id}>
<img class="cocktails__item__img" loading="lazy" src=${image.drinkThumb} alt=${
        image.drink
      }>
<h3 class="cocktails__item__header">${image.drink}</h3>
<p class="cocktails__item__description">${image.description}</p>
<div class="cocktails__btn__container">
<button type="button" class="learnmore__btn"  data-modal-open="modal-cocktails" data-id="${
        image._id
      }">learn more</button>
<button type="button"  class="svg__btn  ${checkElemInLocStor(
        image._id,
        'favorites'
      )}"> 
 <svg class="svg-heart">
<use class="cocktails__svg add_favorites_js" href="${spriteUrl}#icon-heart"></use>
</svg>
</button>
</div> 
</li>
`
    )
    .join('');
}
