



export function renderLogin() {
  const app = document.getElementById("app")
  app.innerHTML=`
    
    
    <main>
        <section class="right">
            <div class="login-box">
                <h2>Iniciar sesión</h2>
                <input type="email" id="login-email" placeholder="ingresa tu correo" />
                <input type="password" id="login-password" placeholder="ingresa tu contraseña" />
                <button type="submit" id="enviar" class="login-btn">Login</button>
                <p class="signup-text">¿No tienes cuenta? <a href="/register" data-link>Registrate aqui</a></p>
            </div>
        </section>
    </main>
    
  
  `;
  
}




