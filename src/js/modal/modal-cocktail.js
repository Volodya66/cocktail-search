// реалізувати відкриття та закриття модалки.  функцію відмалювання розмітки модального вікна коктеля, з файлів element-add-to-local-storage.js та element-remove-from-local-storage імпортувати функції для додавання та видалення елементів local storage для додавання та видалення з улюбленого
(() => {
const modalOpenButtons = document.querySelectorAll('[data-modal-open]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

modalOpenButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modalOpen;
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('[data-modal]');
    closeModal(modal);
  });
});

function openModal(modal) {
  modal.classList.remove('is-hidden');
}

function closeModal(modal) {
  modal.classList.add('is-hidden');
}

})();