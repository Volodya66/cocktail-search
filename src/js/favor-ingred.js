// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з інградієнтами. викликати функцію відмалювання карток інградієнтів render-ingredients-cards.js та передати в неї цей масив інградієнтів та контейнер в якому необхідно відмалювати картки
import axios from "axios";
import * as basicLightbox from 'basiclightbox';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cardContainerEl = document.querySelector('.favor-ingred__gallery');

const KEY_BASKET = 'basket';
const data = JSON.parse(localStorage.getItem(KEY_BASKET));

async function fetchBreeds(parameters) {
    const response = await axios.get(`${BASE_URL}ingredients/search/`, {
       params: {
          ...parameters,
       },
     });
     const data = response.data;
     return data;
  }

  async function fetchIngredient(id) {
    const response = await axios.get(`${BASE_URL}ingredients/${id}`);
     const data = response.data;
     return data;
  }

  const checkAlco = (value)=>{
    return value.toLowerCase() === 'yes' ? 'Alcoholic': 'Non-Alcoholic';
   }

const trimText = (text) =>{
    return  text.slice(0, 110)+ "..."
   }

     function cardMarkupImg(data) {
      return data
        .map(el => {
          return `
            <li class="favor-ingred__card-item">
              <h2 class="favor-ingred__title-name">${el.title}</h2>
              <p class="favor-ingred__text-alco">${checkAlco(el.alcohol)}</p>
              <p class="favor-ingred__text-descr">${trimText(el.description)}</p>
              <div class="card__button-icon">
                <button class="card__close" data-source="${el.description.replace(/['"]+/g,"")}" type="button">learn more</button>
                <button class="svg__close" type="button">
                  <svg class="favor-ingred__svg">
                    <use class="svg-icon" data-id="${el._id}" href="/sprite.f14d31f7.svg#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </li>
                    `;
        })
        .join('');
    };

   

      Promise.all(data.map(async (id) => {
        const data = await fetchIngredient(id);
        return data[0]
       }))
       .then(data=>{
        console.log(data)
        cardContainerEl.insertAdjacentHTML('beforeend', cardMarkupImg(data));
      });
      
       const openModal = (description) => {
        const instance = basicLightbox.create(`
        <div class="modal">
            <p>
              ${description}
            </p>
        </div>
      `)
      instance.show()
      }
      cardContainerEl.addEventListener('click', onClick); 

      async function onClick(event) {
        event.preventDefault()
        if(event.target.className.toString().includes('card__close')){
          openModal(event.target.dataset.source);
        }
      
        if (event.target.classList.contains('svg-icon')) {
         // тут буде удаляти з локал сторейдж
      
        }
      }
