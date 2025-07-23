//Login view.

//This exported function renders the login view on the element with id "app".
export function renderLogin() {
  const app = document.getElementById("app")
  app.innerHTML=`
    
        <section class="right">
            <div class="login-box">
                <h2>Iniciar sesión</h2>
                <input type="email" id="login-email" placeholder="ingresa tu correo" />
                <input type="password" id="login-password" placeholder="ingresa tu contraseña" />
                <button type="submit" id="send" class="login-btn">Login</button>
                <p class="signup-text">¿No tienes cuenta? <a href="/register" data-link>Registrate aqui</a></p>
            </div>
        </section>
   
  `;
  
}




