//реалізувати відмалювання букв для пошуку по першій літері

const lettersContainer = document.querySelector('.container-letters');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const arrayLetters = letters.split('');
let isButtons;

addEventListener('resize', renderSearchLetters);

function renderSearchLetters() {
  const isDesktop = document.documentElement.clientWidth >= 768;

  if (isDesktop) {
    if (!isButtons) renderButtons();
  } else {
    if (isButtons !== false) renderSelect();
  }
}

function renderButtons() {
  const arrayBtnLetters = arrayLetters.map(letter => {
    return `<button class="buton-letters change-theme">${letter}</button>`;
  });

  lettersContainer.innerHTML = arrayBtnLetters.join('');
  isButtons = true;
}

function renderSelect() {
  const selectLetters = document.createElement('select');
  selectLetters.classList.add('letters-select');

  const options = arrayLetters.map(letter => {
    return `<option value="${letter}">${letter}</option>;`;
  });
  selectLetters.insertAdjacentHTML('beforeend', options.join(''));
  lettersContainer.innerHTML = '';
  lettersContainer.appendChild(selectLetters);
  isButtons = false;
}

renderSearchLetters();
