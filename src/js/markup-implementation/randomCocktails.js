   export default function defaultFirstMarkup(arr) {
    try {
      
        return arr.map(({ _id, description, drink, drinkThumb }) => {
           
            return `  <li class="cocktails__item" id="${_id}">
    <img class="cocktails__item__img" src="${drinkThumb}" alt="${drink}"/>
    <h2 class="cocktails__item__header">${drink}</h2>
    <p class="cocktails__item__description">${description}</p>
    <div class="cocktails__item__btn">
    <button type="button">learn more</button>
    <button type="button">
        <svg>
            <use href="./img/sprite.svg#icon-heart"></use>
        </svg>
    </button>
</div>
</li>`
        }).join('');

    }

    catch {
        console.log(error)
    }
}

