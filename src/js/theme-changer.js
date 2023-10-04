// реалізувати логіку перемикача теми сайту та зробити іменований експорт змінної зі значенням true, якщо темна тема увімкнена, false, якщо темна тема вимкнена, також реалізувати логіку додавання цього значення у властивість в localStorage, та зчитування цього, якщо користувач вже відвідував сайт і вибирав тему

const btnChangeThemeRef = document.querySelector('#js-btn-change-theme');
const elementDarkThemeChange = [...document.querySelectorAll('.change-theme')];

function saveDarkModeState(isDarkModeEnabled) {
  localStorage.setItem('darkMode', isDarkModeEnabled);
}

function loadDarkModeState() {
  return localStorage.getItem('darkMode') === 'true';
}

const isDarkModeEnabled = loadDarkModeState();
elementDarkThemeChange.forEach(element => {
  element.classList.toggle('dark-mode', isDarkModeEnabled);
});

if (isDarkModeEnabled) {
  btnChangeThemeRef.classList.add('clicked');
}

btnChangeThemeRef.addEventListener('click', () => {
  elementDarkThemeChange.forEach(element => {
    element.classList.toggle('dark-mode');
  });

  const isDarkModeToggled = !isDarkModeEnabled;
  saveDarkModeState(isDarkModeToggled);

  btnChangeThemeRef.classList.toggle('clicked');
});
