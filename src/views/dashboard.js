//Dashboard view.

//This exported function renders the dashboard view on the element with id "app".
export const renderDashboard =
  `
<section id="all-content" class="courses-section">
    <button id="log-out" class="btn-log-out">Cerrar sesión</button>
      <button id="create-new-admin" class="create-new-admin">Crear nuevo administrador</button>

      <h2 class="title">Próximas Tutorías</h2>

      <button class="btn-create-course" id="btn-create">Crear nueva tutoria</button>
      
      <form id="form-course" style="display: none;">
        <input type="text" id="language-name" placeholder="Nombre de la tutoría" required />
        <input type="text" id="language-description" placeholder="Descripción de la tutoría" required />
        <input type="text" id="language-image" placeholder="URL de la imagen" required />
        <button type="submit">Guardar lenguaje</button>
      </form>

      <form id="form">
        <input type="text" id="regisName" name="name" placeholder="Ingresa tu nombre">
        <input type="text" id="regisUsername" name="username" placeholder="ingresa tu nombre de usuario">
        <input type="email" id="regisEmail" name="email" placeholder="Ingresa un correo">
        <input type="tel" id="reigisId" name="tel" placeholder="Ingresa tu numero de identificación">
        <input type="password" id="regisPassword" name="name" placeholder="Ingresa tu contraseña  ">
        <button type="submit" class="login-btn" id="regis-new-admin">Registrar nuevo administrador </button>
      </form> 


      <section class="courses-section">
        <div class="courses-grid" id="courses-grid">
        </div>
      </section>    
</section>

`;