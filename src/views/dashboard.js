//Dashboard view.

//This exported function renders the dashboard view on the element with id "app".
export function renderDashboard() {
  const app = document.getElementById("app")
  app.innerHTML=`
    <main>
        <section id="all-content" class="courses-section">
            <button id="log-out" class="btn-log-out">Cerrar sesión</button>

              <h2 class="title">Próximas Tutorías</h2>

              <button class="btn-create-course" id="btn-create">Crear nueva tutoria</button>

              <form id="form-course" style="display: none;">
                <input type="text" id="language-name" placeholder="Nombre de la tutoría" required />
                <input type="text" id="language-description" placeholder="Descripción de la tutoría" required />
                <input type="text" id="language-image" placeholder="URL de la imagen" required />
                <button type="submit">Guardar lenguaje</button>
              </form>

              <section class="courses-section">
                <div class="courses-grid" id="courses-grid">
                </div>
              </section>    
        </section>
    </main>

  
  `;

}







