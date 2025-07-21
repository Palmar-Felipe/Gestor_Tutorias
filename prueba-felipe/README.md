# pagina de eventos 

Una sencilla aplicación web de gestión de eventos, desarrollada con HTML, CSS y JavaScript. Permite a los administradores crear nuevos eventos con acceso basado en roles y autenticación de usuarios mediante un servidor JSON.


📂 Project Structure




## Project Structure

pruebafinal/
|
├──prueba-felipe/
|   ├──public/
│   │   └── database.json
│   ├──src/                        
│      ├ css/
├      |    ├──404.css
|      |    ├──courses.css
|      |    ├──login.css
|      |    ├──register.css
│      |    └── style.css           
│      |
|      |──img/
|      |    └── 143265.webp
│      └── js/                    
│      |     ├── alert.js
|      |     |
|      |     |---functiondashboar.js
|      |     |
|      |     |---funtion404.js
|      |     |
|      |     |---funtionlogin.js
|      |     |
|      |     |---funtionregister
|      |     
|      |     
|      └──views
|           |
|           |--404.js
|           |--dashboard.js
|           |--login.js
|           |--register.js
|           |--star.js           
│      
│
├── .gitignore                  
├── index.html
│── package.json
|--main.js
│── License
│── README.MD
|--styles.css


✅ User registration with duplicate validation
✅ Role-based login: Administrator
✅ CRUD-based dashboard for creating new events and registering users
✅ Session persistence based on LocalStorage
✅ Automatic 404 error redirection for invalid paths
✅ Clean, responsive user interface


🛠️ Installation & Usage
1. Clone the repository
git clone https://github.com/your-username/petcare-center.git
cd petcare-center

2. Install JSON Server

npm install -g json-server


3. Run JSON Server

json-server --watch public/database.json --port 3000

4. Open index.html in your browser
You can also use Live Server or Vite for better routing experience.

👥 User Roles
Role	Permissions
administrador	Can add, edit, and delete pets
trabajador	Can add and edit, not delete

Add users directly to public/database.json like:

json
Copiar
Editar

"id": "3d76",
      "nombre": "felipe miguel palmar ramirez",
      "usuario": "pipe",
      "correo": "pipepalmar@hotmail.com",
      "documento": "1119392593",
      "contrasena": "123",
      "rol": "usuario"

## Name felipe Miguel Palmar Ramirez
## id 1119392593

## clan: caiman