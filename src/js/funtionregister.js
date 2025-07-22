import { renderLogin } from "../views/login";

const url = "http://localhost:3000/registros";
export function afterRegister(){
    const $name = document.getElementById("register-name");
    const $user = document.getElementById("register-username");
    const $email = document.getElementById("register-email");
    const $cedula = document.getElementById("register-cedula");
    const $password = document.getElementById("register-password");
    const $register = document.getElementById("registrar")

    $register.addEventListener("click", async (e) => {
        e.preventDefault();             //prevents the page from reloading if it is in a form
        await registerUser();
    })

    async function registerUser() {

        const registrar = {
            nombre: $name.value,
            usuario: $user.value,
            correo: $email.value,
            documento: $cedula.value,
            contrasena: $password.value,
            rol: "coder"
        }

        if (
            registrar.nombre === "" ||
            registrar.usuario === "" ||
            registrar.correo === "" ||
            registrar.documento === "" ||
            registrar.contrasena === ""
        ) {
            alert("completa todos los campos");
            return;
        }

        const reco = await fetch(url);
        const buscaUsuario = await reco.json();

        const existe = buscaUsuario.some(
            (i) =>
                i.usuario === registrar.usuario ||
                i.correo === registrar.correo ||
                i.documento === registrar.documento

        );

        if (existe) {
            alert("los datos ingresados ya se encuentras registrados por otro usuario")
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(registrar.correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        const responde = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registrar)
        });

        if (responde.ok) {
            renderLogin() ;
            alert("Registro exitoso")

        } else {
            alert("Intentelo de nuevo por favor")
        }

        $name.value = "";
        $user.value = "";
        $email.value = "";
        $cedula.value = "";
        $password.value = "";
    };
}