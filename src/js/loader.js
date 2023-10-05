export function showLoader(container) {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  container.appendChild(loader);
}

export function hideLoader(container) {
  const loader = container.querySelector('.loader');
  if (loader) {
    container.removeChild(loader);
  }
}
