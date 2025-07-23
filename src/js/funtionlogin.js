// This file handles the login functionality for the application.

//Endpoint URL for the user records.
const url = "http://localhost:3000/records";

//Exported function of the login functionality.
export function afterLogin(){

    const $email = document.getElementById("login-email");
    const $password = document.getElementById("login-password");
    const $enter = document.getElementById("send");

    const save = JSON.parse(localStorage.getItem("email"));
    if (save){
        window.location.href="/dashboard";
    }


    $enter.addEventListener("click", function(i){
        i.preventDefault();
        login();
        
    });

    //Function to handle the login process, including validations.
    async function login() {

        if ($email.value === "" || $password.value === "") {
            alert("Por favor, completa todos los campos.");
            return; // Evita que siga ejecutando si están vacíos
        };

        const search = await fetch(`${url}?email=${$email.value.trim()}`);
        const response = await search.json();

        if(response.length === 0){
            alert("Este usuario no existe, por favor regístrese");

        }else{
            if(response[0].password === $password.value.trim()){
                localStorage.setItem("usuario", JSON.stringify(response[0]));
                alert ("inicio de sesion correcto")
                window.location.href ="/dashboard";
            }else{
                alert("contraseña incorrecta")
            };
        };
    };
};



