//record view

export function renderRegister() {
  const app = document.getElementById("app")
  
  app.innerHTML=`
    
    <main>
        <section class="right">
            <div class="login-box">
                <h2>Crear cuenta</h2>

                <form id="register-form">
                    <input type="text" id="register-name" placeholder="Nombre completo" required />
                    <input type="text" id="register-username" placeholder="Nombre de usuario" required />
                    <input type="email" id="register-email" placeholder="Correo electrónico" required />
                    <input type="tel" id="register-cedula" placeholder="Número de cedula" required />
                    <input type="password" id="register-password" placeholder="Contraseña" required />
                    <button type="submit" class="login-btn" id="registrar">Registrarse</button>
                    <p class="signup-text">
                        ¿Ya tienes cuenta?
                        <a href="/login" data-link id="register-go-login">Inicia sesión</a>
                    </p>
                </form>
            </div>
        </section>
    </main>
    `;
  
}




