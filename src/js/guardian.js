import { auth } from './auth.js';
import { router } from '../../router.js';

export function guard() {
    const path = window.location.pathname || "/";
    const isAuth = auth.isAuthenticated();

    // Rutas públicas manuales
    const publicPaths = ["/", "/start", "/login", "/register"];

    // Si está autenticado y trata de ir a login o register
    if (isAuth && (path === "/login" || path === "/register")) {
        window.history.pushState({}, "", "/dashboard");
        router();
        return false;
    }

    // Si no está autenticado y va a ruta privada
    if (!isAuth && !publicPaths.includes(path)) {
        window.history.pushState({}, "", "/");
        router();
        return false;
    }

    // Permitir el acceso
    return true;
}
