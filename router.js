import { afterLogin } from "./src/js/funtionlogin";
import { renderStart } from "./src/views/start";
import { renderLogin } from "./src/views/login.js";
import { renderRegister } from "./src/views/register";
import { renderDashboard } from "./src/views/dashboard";
import { render404 } from "./src/views/404";
import { afterDashboard } from "./src/js/functiondashboard";
import { afterRegister } from "./src/js/funtionregister";
import { after404 } from "./src/js/funtion404";
import { guard } from "./src/js/guardian";

const routes = {
    "/": {
        showView: renderStart,
        private: false
    },
    "/start": {
        showView: renderStart,
        private: false
    },
    "/register": {
        showView: renderRegister,
        afterRender: afterRegister,
        private: false
    },
    "/login": {
        showView: renderLogin,
        afterRender: afterLogin,
        private: false
    },
    "/dashboard": {
        showView: renderDashboard,
        afterRender: afterDashboard,
        private: false
    },
    "/404": {
        showView: render404,
        afterRender: after404,
        private: false
    }
}


export function router() {
    // Guard validation
    const canActivate = guard();
    if (!canActivate) {
        // The guard
        router();
        return;
    };
    
    const path = window.location.pathname || '/';
    const app = document.getElementById('app');
    const currentRoute = routes[path];

    if (currentRoute) {
        app.innerHTML = currentRoute.showView;
        if (typeof currentRoute.afterRender === 'function') {
            currentRoute.afterRender();
        }
    }
}
