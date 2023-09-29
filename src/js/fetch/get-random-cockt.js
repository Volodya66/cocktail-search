// реалізувати запит на сервер за рандомними коктейлями. Викликати функцію з файлу render-coctails-card.js та передати туди масив та контейнер


import axios from 'axios';
import  error  from 'console';



const BASE_URL = "https://drinkify.b.goit.study/api/v1";

 function renderingCardDependency() {
    let widthWindowUser = document.documentElement.clientWidth;
    let requestCards = (widthWindowUser > 1280) ? 9 : 8;
    return requestCards
};

 function getRequest() {
    // ? вираховуємо ширину в*юпорта користувача 
    let widthWindowUser = document.documentElement.clientWidth;
if (widthWindowUser) {
    
    firstReqAPI(renderingCardDependency())
        .then(data => {
            // console.log("data", data)
            

            //? Тут свор.ється розмітка з виклику функції з файлу render-coctails-card.js
            // const markup = defaultFirstMarkup(data);
            // console.log(markup)

            //? передати туди масив та контейнер >

    })
  .catch(error => {
     console.error(error.message);
   });
};
}

getRequest();
 

async function firstReqAPI(param) {


try { 
    let response = await axios.get(`${BASE_URL}/cocktails/?r=${param}`);     
    return  response.data;
}
    
catch {
    console.error(error.message);
    }
};


export { renderingCardDependency };



// function defaultFirstMarkup(arr) {
//     try {
      
//         return arr.map(({ _id, description, drink, drinkThumb }) => {
           
//             return `  <li class="cocktails__item" id="${_id}">
//     <img class="cocktails__item__img" src="${drinkThumb}" alt="${drink}"/>
//     <h2 class="cocktails__item__header">${drink}</h2>
//     <p class="cocktails__item__description">${description}</p>
//     <div class="cocktails__item__btn">
//     <button type="button">learn more</button>
//     <button type="button">
//         <svg>
//             <use href="./img/sprite.svg#icon-heart"></use>
//         </svg>
//     </button>
// </div>
// </li>`
//         }).join('');

//     }

//     catch {
//         console.log(error)
//     }
// }