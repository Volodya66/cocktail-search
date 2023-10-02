// реалізувати відкриття, закриття мобільного меню



(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
      };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();


// ВІДКРИТТЯ ДРОПДАУН З МЕНЮ FAVORITE та поворот стрілки

const dropbtn = document.querySelector('.dropbtn');
const iconChevronDown = document.querySelector('.icon-chevron-down');

dropbtn.addEventListener('click', onclickDropdown)

function onclickDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
  iconChevronDown.classList.toggle('rotate');
}



// ЗАКРИТТЯ ДРОПДАУН ПРИ КЛІКУ НЕ НА МЕНЮ, А ПОРУЧ

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  const myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
      iconChevronDown.classList.toggle('rotate');
      };
    }
}