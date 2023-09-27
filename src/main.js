import firstReqAPI from './js/Get Data/CocktailAPI'

 // ? вираховуємо ширину в*юпорта користувача 
let widthWindowUser = document.documentElement.clientWidth;
if (widthWindowUser) {
    let requestCards = (widthWindowUser > 1280) ? 9 : 8;
    console.log(widthWindowUser)
    const data = firstReqAPI(requestCards);
console.log("data", data)
};