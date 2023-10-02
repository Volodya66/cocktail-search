// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з інградієнтами. викликати функцію відмалювання карток інградієнтів render-ingredients-cards.js та передати в неї цей масив інградієнтів та контейнер в якому необхідно відмалювати картки
import axios from 'axios';
import * as basicLightbox from 'basiclightbox';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cardContainerEl = document.querySelector('.favor-ingred__gallery');

const KEY_BASKET = 'basket';
const data = JSON.parse(localStorage.getItem(KEY_BASKET));

if (data.length === 0) {
  // вставляєм заглушку
} else if (data.length > 6) {
  // вставляєм пагінацію
}

async function fetchIngredient(id) {
  const response = await axios.get(`${BASE_URL}ingredients/${id}`);
  const data = response.data;
  return data;
}

function checkAlco(value) {
  return value.toLowerCase() === 'yes' ? 'Alcoholic' : 'Non-Alcoholic';
}

function trimText(text, maxLength) {
  let result;
  if (text.length > maxLength) {
    result = text.slice(0, maxLength) + '...';
  } else {
    result = text;
  }
  return result;
}

function cardMarkupImg(data) {
  return data
    .map(el => {
      return `
          <li class="favor-ingred__card-item" id="${el._id}">
            <h2 class="favor-ingred__title-name">${el.title}</h2>
            <p class="favor-ingred__text-alco">${checkAlco(el.alcohol)}</p>
            <p class="favor-ingred__text-descr">${trimText(
              el.description,
              139
            )}</p>
            <div class="card__button-icon">
              <button class="card__close" data-id="${
                el._id
              }" data-source="${el.description.replace(
        /['"]+/g,
        ''
      )}" type="button">learn more</button>
              <button class="svg__close" type="button">
                <svg class="favor-ingred__svg" data-id="${el._id}">
                  <use class="svg-icon" data-id="${
                    el._id
                  }" href="./images/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>
                  `;
    })
    .join('');
}

Promise.all(
  data.map(async id => {
    const data = await fetchIngredient(id);
    return data[0];
  })
).then(data => {
  console.log(data);
  cardContainerEl.insertAdjacentHTML('beforeend', cardMarkupImg(data));
});

function openModal(description) {
  const instance = basicLightbox.create(
    `
          <div class="modal">
              <p>
                ${description}
              </p>
          </div>
        `,
    {
      handler: null,
      onShow(instance) {
        this.handler = closeModal.bind(instance);
        document.addEventListener('keydown', this.handler);
      },
      onClose(instance) {
        document.removeEventListener('keydown', this.handler);
      },
    }
  );
  instance.show();
}

function closeModal(evt) {
  if (evt.code === 'Escape') {
    this.close();
  }
}

cardContainerEl.addEventListener('click', onClick);

async function onClick(event) {
  event.preventDefault();
  if (event.target.className.toString().includes('card__close')) {
    openModal(event.target.dataset.source);
  }

  if (event.target.classList.contains('favor-ingred__svg')) {
    data.splice(event.target.dataset.id, 1);
    localStorage.setItem(KEY_BASKET, JSON.stringify(data));
    const element = document.getElementById(event.target.dataset.id);
    console.log(element);
    element.remove();
  }
}
