// реалізувати реалізувати відкриття та закриття модалки.  функцію відмалювання розмітки модального вікна інградіента, з файлів element-add-to-local-storage.js та element-remove-from-local-storage імпортувати функції для додавання та видалення елементів local storage для додавання та видалення з улюбленого


import axios from 'axios';


const BASE_URL_INGREDIENT = "https://drinkify.b.goit.study/api/v1/ingredients/";
const divModalIngredient = document.querySelector('.modal-ingredient-details');
const modal = document.querySelector('.modal-ingredients');


// const listCocktail = document.querySelector('.list-cocktail-ingredients');
// listCocktail.addEventListener('click', selectedIngredient)




async function  selectedIngredient(evt) {

    if (evt.target.nodeName !== "LI") {
        return
    }
    console.log(modal)
    openModal();
    divModalIngredient.innerHTML = '';
    // openModal();
   
    // const btnModalIngredientBack = document.querySelector('.modal-ingredient-back')
    let idIngredient = evt.target.getAttribute('id');
    // console.log(idIngredient);
    let dataSearchParam = await ingredientSearchRequest(idIngredient);
    let markup = markupModalIngredients(dataSearchParam);
    
    // ? додавання в до діва розмітки 
    divModalIngredient.insertAdjacentHTML("afterbegin", markup);

    const closeModalButton = document.querySelector('.js-close-btn');
    const closeModalBtnTwo = document.querySelector('.js-close-btn-two')
    // console.log(closeModalButton)
    closeModalBtnTwo.addEventListener('click', closeModalIngredient)
    closeModalButton.addEventListener('click', closeModalIngredient)
    function closeModalIngredient() {
      closeModal();
      
    } 
};

function markupModalIngredients(objParam){
    
    return objParam.map(({ type, title, description, abv, country, flavour }) => {
        abv = abv || "Not defined, so you will have to taste!";
        country = country || "There is no country of origin";
        flavour = flavour || "Not specified";
        return `
         <button class="close-modal-cocktails js-close-btn" data-modal-close-ingr>
      <svg class="svg-close-modal-cocktails" width="22" height="22">
        <use href="/img/sprite.svg#icon-close"></use>
      </svg>
    </button>
    <h2 class="modal-ingredient-title">${title}</h2>
    <p class="modal-ingredient-type">${type}</p>
    <span class="lin"></span>
    <p class="modal-ingredient-text"><span class="modal-ingredient-span-black">${title}</span>: ${description}</p>
    <ul class="modal-ingredient-list-properties">
      <li class="modal-ingredient-list-item">Type:${type}</li>
      <li class="modal-ingredient-list-item">Country of origin:${country}</li>
      <li class="modal-ingredient-list-item">Alcohol by volume:${abv}</li>
      <li class="modal-ingredient-list-item">Flavour:${flavour}</li>
    </ul>
    <ul class="modal-ingredient-list-btn">
      <button name="ingredient-add" class="modal-button modal-ingredient-add">add to favorite</button>
      <button name="ingredient-back" class="modal-button js-close-btn-two modal-ingredient-back" data-modal-close>back</button>
    </ul>
        `
    }).join('')

};

async function ingredientSearchRequest(searchParamId) {
    try {
        let responseForIngr = await axios.get(`${BASE_URL_INGREDIENT}${searchParamId}`)
        // console.log(responseForIngr.data)
        return responseForIngr.data
    }
    catch {
        console.log(error.message)
    }

}

function openModal() {
    modal.classList.remove('is-hidden');
}


function closeModal() {
    modal.classList.add('is-hidden');
}

export {selectedIngredient}