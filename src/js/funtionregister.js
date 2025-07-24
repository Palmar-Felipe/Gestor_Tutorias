//This file handles the user registration functionality.

//Imported view rendering function.
import { renderLogin } from "../views/login";

//Endpoint URL for the user records.
const url = "http://localhost:3000/records";

//Exported function of the registration functionality.
export function afterRegister(){
    const $name = document.getElementById("register-name");
    const $user = document.getElementById("register-username");
    const $email = document.getElementById("register-email");
    const $document = document.getElementById("register-doc");
    const $password = document.getElementById("register-password");
    const $register = document.getElementById("register")

    $register.addEventListener("click", async (e) => {
        e.preventDefault();             //Prevents the page from reloading if it is in a form.
        await registerUser();
    })

    //Function to handle the user registration process, including validations.
    async function registerUser() {

        const register = {
            name: $name.value,
            user: $user.value,
            email: $email.value,
            document: $document.value,
            password: $password.value,
            role: "coder"
        }

        if (
            register.name === "" ||
            register.user === "" ||
            register.email === "" ||
            register.document === "" ||
            register.password === ""
        ) {
            alert("completa todos los campos");
            return;
        }

        //Check if the user already exists in the database.
        const reco = await fetch(url);
        const searchUser = await reco.json();

        const exist = searchUser.some(
            (i) =>
                i.user === register.user ||
                i.email === register.email ||
                i.document === register.document 

        );

        if (exist) {
            alert("los datos ingresados ya se encuentras registrados por otro usuario")
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(register.email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        //Create a new user in the database.
        const responde = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register)
        });

        if (responde.ok) {
            renderLogin() ;
            alert("Registro exitoso")

        } else {
            alert("Intentelo de nuevo por favor")
        }

        //Reset the form fields after successful registration.
        $name.value = "";
        $user.value = "";
        $email.value = "";
        $document.value = "";
        $password.value = "";
    };
}