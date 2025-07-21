
//home section
export function renderStart() {
  const app = document.getElementById("app")
  //home view
  app.innerHTML = `
  
  
   <main>
      <section class="contenido-derecha">
        <h1><span class="highlight">InnovaCode</span></h1>
        <p class="mensaje">
          Donde las ideas se convierten en código, y el código en futuro.
          Innovamos, diseñamos y construimos el software que mueve al mundo digital.
          Únete al cambio. Crea sin límites.
          <span class="hashtag">#ThinkCode #InnovaTuMundo</span>
        </p>
        <a href="/login" data-link>
          <button id="start" class="join-btn">Únete con nosotros</button>
        </a>
      </section>
    </main>


  
  
  `;

}




