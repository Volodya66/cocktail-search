// реалізувати логіку перемикача теми сайту та зробити іменований експорт змінної зі значенням true, якщо темна тема увімкнена, false, якщо темна тема вимкнена, також реалізувати логіку додавання цього значення у властивість в localStorage, та зчитування цього, якщо користувач вже відвідував сайт і вибирав тему

const btnChangeThemeRef = document.querySelectorAll('#js-btn-change-theme');
function onBtnChangerClick(e) {
  const elementDarkThemeChange = [
    ...document.querySelectorAll('.change-theme'),
  ];
  elementDarkThemeChange.forEach(element => {
    element.classList.toggle('dark-mode');
  });
}
btnChangeThemeRef.forEach(element => {
  element.addEventListener('click', onBtnChangerClick);
});

// const btnChangeThemeRef = document.querySelector('#js-btn-change-theme');

// function onBtnChangerClick(e) {
//   const elementDarkThemeChange = [
//     ...document.querySelectorAll('.change-theme'),
//   ];

//   const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

//   elementDarkThemeChange.forEach(element => {
//     element.classList.toggle('dark-mode', isDarkModeEnabled);
//   });

//   localStorage.setItem('darkMode', !isDarkModeEnabled);
// }

// btnChangeThemeRef.addEventListener('click', onBtnChangerClick);

// window.addEventListener('load', () => {
//   const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

//   const elementDarkThemeChange = [
//     ...document.querySelectorAll('.change-theme'),
//   ];

//   elementDarkThemeChange.forEach(element => {
//     element.classList.toggle('dark-mode', isDarkModeEnabled);
//   });
// });
