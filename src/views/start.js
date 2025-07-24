//Home view.

//This exported function renders the home view on the element with id "app".
export const renderStart = `
   <main class="main-layout">
  <!-- Lado izquierdo: logo -->
  <section class="logo-container">
    <img src="./src/img/logo.png" alt="logo_de_tutorias" class="logo" id="logo">
  </section>

  <!-- Lado derecho: texto y botón -->
  <section class="content-right">
    <h1><span class="highlight">InnovaCode</span></h1>
    <p class="message">
      Donde las ideas se convierten en código, y el código en futuro.
      Innovamos, diseñamos y construimos el software que mueve al mundo digital.
      Únete al cambio. Crea sin límites.
      <span class="hashtag">#ThinkCode #InnovaTuMundo</span>
    </p>
    <a href="/login" id="start" class="join-btn" data-link> Únete con nosotros</a>
  </section>
</main>
  `