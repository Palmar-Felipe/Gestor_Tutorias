import { afterLogin } from "./src/js/funtionlogin.js";
import { renderStart } from "./src/views/start.js";
import { renderLogin } from "./src/views/login.js";
import { renderRegister } from "./src/views/register.js";
import { renderDashboard } from "./src/views/dashboard.js";
import { render404 } from "./src/views/404.js";
import { afterDashboard } from "./src/js/functiondashboard.js";
import { afterRegister } from "./src/js/funtionregister.js";




const routes ={
    "/":{
        showView: renderStart,
        private: false
    },
    "/start":{
        showView: renderStart,
        private: false
    },
    "/register":{
        showView: renderRegister,
        afterRender: afterRegister,
        private: false
    },
    "/login":{
        showView: renderLogin,
        afterRender: afterLogin,
        private: false
    },
    "/dashboard":{
        showView: renderDashboard,
        afterRender: afterDashboard,
        private: false
    },
   
}


export function router() {
    const path = window.location.pathname || '/';
    const app = document.getElementById('app');
    const currentRoute =routes[path];

    if (currentRoute){
        app.innerHTML= currentRoute.showView ;
        if(typeof currentRoute.afterRender === 'function'){
            currentRoute.afterRender();
        }
    }else{
        app.innerHTML= render404;
    }
    
}   