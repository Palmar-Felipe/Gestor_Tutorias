

export function render404() {
  const app = document.getElementById("app")
  app.innerHTML=`
  <body>

    <h1>404</h1>

    <h2>Oops! Page Not Found</h2>
    <p>The page you're looking for doesn't exist or was moved.</p>

    <a href="start" data-link  class="back-btn">Back to Home</a>

  </body>`

}




