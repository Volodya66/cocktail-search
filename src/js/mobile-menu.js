// реалізувати відкриття, закриття мобільного меню
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