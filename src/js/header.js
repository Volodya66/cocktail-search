const headerMenu = document.querySelector('.dropdown-trigger');
const headerDropMenu = document.querySelector('.dropmenu');

function onHeaderDropMenuClick(e) {
    headerDropMenu.classList.toggle('active');
}

headerMenu.addEventListener('click', onHeaderDropMenuClick);