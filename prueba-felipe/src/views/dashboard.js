

export function renderDashboard() {
  const app = document.getElementById("app")
  app.innerHTML=`
    <main>
        <section id="todo" class="cursos-section">
            <button id="cerrar-sesion" class="btn-cerrar-sesion">Cerrar sesión</button>

              <h2 class="titulo">proximas tutorías</h2>

              <button class="btn-crear-curso" id="btn-crear">Crear nueva tutoria</button>

              <form id="form-curso" style="display: none;">
                <input type="text" id="nombre-lenguaje" placeholder="Nombre del evento" required />
                <input type="text" id="descripcion-lenguaje" placeholder="Descripción del evento" required />
                <input type="text" id="imagen-lenguaje" placeholder="URL de la imagen" required />
                <button type="submit">Guardar lenguaje</button>
              </form>

              <section class="cursos-section">
                <div class="cursos-grid" id="cursos-grid">
                </div>
              </section>    
        </section>
    </main>

  
  `;

}







