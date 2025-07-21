
const url = "http://localhost:3000/registros";
export function afterLogin(){
    
    
    //function of login
    const $correo =document.getElementById("login-email");
    const $contra =document.getElementById("login-password");
    const $entrar=document.getElementById("enviar");

    const save = JSON.parse(localStorage.getItem("correo"));
    if (save){
        window.location.href="/dashboard";
    }


    $entrar.addEventListener("click", function(i){
        i.preventDefault();
        login();
        
    });




    

    async function login() {

        if ($correo.value === "" || $contra.value === "") {
            alert("Por favor, completa todos los campos.");
            return; // Evita que siga ejecutando si están vacíos
        };

        const busca = await fetch(`${url}?correo=${$correo.value.trim()}`);
        const sultado = await busca.json();

        if(sultado.length === 0){
            alert("Este usuario no existe, por favor regístrese");

        }else{
            if(sultado[0].contrasena === $contra.value.trim()){
                localStorage.setItem("usuario", JSON.stringify(sultado[0]));
                alert ("inicio de sesion correcto")
                window.location.href ="/dashboard";
            }else{
                alert("contraseña incorrecta")
            };
        };
    };
};



