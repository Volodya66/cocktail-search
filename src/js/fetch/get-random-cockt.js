// реалізувати запит на сервер за рандомними коктейлями. Викликати функцію з файлу render-coctails-card.js та передати туди масив та контейнер

import axios from 'axios';


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
    
   return firstReqAPI(renderingCardDependency())
        .then(data => {
            console.log("data", data)
            return data;
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


