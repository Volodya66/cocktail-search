// реалізувати логіку завантаження інформації з local storage та на основі неї створити масив з коктейлями. викликати функцію відмалювання карток та передати в неї цей масив коктейлів
export function changeEvents(event){
    const target = event.target;
    if (target.classList.contains('learnmore__btn')) {
    console.log("Open modal");

  }
   if (target.classList.contains('svg__btn')) {
    addToFavorites(event);

    if(addToFavorites()){
 svg.classList.remove('.add_favorites_js');
 svg.classList.add('.remove_favorites_js');
    }}
    
    return;
  }
// LOCAL STORAGE GET AND SAVE
function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(event) {
  const card = event.target.closest('.cocktails__item');
  if (card) {
    const id = card.getAttribute('id');
    const cocktailData = {
      id: id,
      name: card.querySelector('.cocktails__item__header').textContent,
      description: card.querySelector('.cocktails__item__description').textContent,
      imageSrc: card.querySelector('.cocktails__item__img').src,
    };

    console.log(cocktailData);

    const favorites = getFavorites();

    if (!favorites.some(favorite => favorite.id === cocktailData.id)) {
      favorites.push(cocktailData);
      saveFavorites(favorites);
    }
  }
}

