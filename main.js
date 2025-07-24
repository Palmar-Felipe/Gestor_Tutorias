import { router } from './router.js';

// Ejecutar el router cuando cargue la página
window.addEventListener('DOMContentLoaded', () => {
  router();
});

// Ejecutar el router cuando se navega con el historial (atrás/adelante)
window.addEventListener('popstate', () => {
  router();
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    window.history.pushState({}, "", href);
    router();
  }
});

document.addEventListener('click',e=>{
    if(e.target.matches('[data-link]')){
        e.preventDefault();
        history.pushState(null,null,e.target.href);
        router()
    }
});
