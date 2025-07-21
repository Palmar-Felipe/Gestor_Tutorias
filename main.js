import { router } from "./router";

window.addEventListener('popstate', router);
window.addEventListener('load', router);






document.addEventListener('click',e=>{
    if(e.target.matches('[data-link]')){
        e.preventDefault();
        history.pushState(null,null,e.target.href);
        router()
    }
});
