// реалізувати відкриття та закриття модалки.  функцію відмалювання розмітки модального вікна коктеля, з файлів element-add-to-local-storage.js та element-remove-from-local-storage імпортувати функції для додавання та видалення елементів local storage для додавання та видалення з улюбленого
import axios from 'axios';
// import { renderCocktailModal } from '../render/render-coctails-cards';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1';
const modalOpenButtons = document.querySelectorAll('[data-modal-open]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
const cocktailsList = document.querySelector('.cocktails__list');

function addListenerToLearnMoreBtn(containerUlRef) {
  function onCocktailCardItemBtnClick(e) {
    if (e.target.nodeName !== 'BUTTON' || !e.target.dataset.id) {
      return;
    }
    console.log(e.target.dataset.id);
    //тут далі можеш свою логіку запиту писати то шо поверне e.target.dataset.id буде айдішніком тої картки, на яку нажали лерн мор
  }
  containerUlRef.addEventListener('click', onCocktailCardItemBtnClick);
}
addListenerToLearnMoreBtn(cocktailsList)


modalOpenButtons.forEach(button => {
button.addEventListener('click', () => {
  const modalId = button.dataset.modalOpen;
  const modalCardId = button.id;
  const modal = document.getElementById(modalId);
  openModal(modal, modalCardId);
  });
});

modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('[data-modal]');
    closeModal(modal);
  });
});

function openModal(modal, modalId) {
  modal.classList.remove('is-hidden');
  getRequestModalCocktail(modalId);
}
function closeModal(modal) {
  modal.classList.add('is-hidden');
}

async function getRequestModalCocktail(modalCardId) {
  return firstReqAPIModal(modalCardId)
    .then(data => {
      const cocktailsList = document.querySelector('.js-modal-cocktails');
      renderCocktailModal(data, cocktailsList);
    })
    .catch(error => {
      console.error(error.message);
    });
}

async function firstReqAPIModal(id) {
  try {
    let response = await axios.get(`${BASE_URL}/cocktails/lookup/?id=${id}`);
    return response.data;
  } catch {
    console.error(error.message);
  }
}

function renderCocktailModal(images, container) {
  images[0].ingredients.forEach(element => {
    console.log(element.title+' '+element.measure)
  });
  container.innerHTML = images
    .map(
      image => `
        <li class="js-modal-cocktails-item id=${image._id}">
        <ul class="modal-cocktails-card-part-1 list">
          <li class="modal-cocktails-card-item">
            <div class="modal-cocktails-img-wrapper">
              <img
                class="modal-cocktails-img"
                src="${image.drinkThumb}"
                alt="${image.drink}"
                loading="lazy"
              />
            </div>
          </li>
          <li class="modal-cocktails-card-item">
            <h2 class="modal-cocktails-card-title">${image.drink}</h2>
            <h2 class="modal-cocktails-info-part-title">INGREDIENTS:</h2>
            <p class="modal-cocktails-info-part-undotitle">Per cocktail</p>
            <ul class="modal-cocktails-info-part-1-list">
            </ul>
          </li>
        </ul>
        <div class="modal-cocktails-card-part-2">
          <h2 class="modal-cocktails-info-part-title">INSTRUCTIONS:</h2>
          <p class="modal-cocktails-info-part-2-text">${image.instructions}</p>
        </div>
        </li>
      `
    )
    .join('');
}
