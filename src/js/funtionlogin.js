// This file handles the login functionality for the application.

//Endpoint URL for the user records.
const url = "http://localhost:3000/records";

//imppor dashboard render
import { renderDashboard } from "../views/dashboard.js";
//import the auth
import {auth} from "./auth.js";

//Exported function of the login functionality.
export function afterLogin() {
    console.log("login.js init loaded");

    const $email = document.getElementById("login-email");
    const $password = document.getElementById("login-password");
    const $enter = document.getElementById("send");
    console.log("imputs data loaded");

    // Validation of the correct existance of the form
    if (!$email || !$password) {
        console.error("login inputs not found");
        return;
    };

    $enter.addEventListener("click", async function (i) {
        i.preventDefault();

        // get imput from the form
        const email = $email.value.trim();
        const password = $password.value;

        //verify the correct fill of fields
        if (!$email || !$password) {
            alert("Please fill in all fields.");
            return;
        };

        try {
            //validate in the server the data, and get it
            const users = await fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            console.log("the data has been seen");

            const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

            //if doesn't exist
            if (!user || user.password !== password) {
                alert("It seems that there's an error on the data.");
                return;
            };

            //make a fake token and encrypt
            const fakeToken = `${user.username}-${Date.now()}`;
            auth.login(fakeToken, user);

            //alert
            alert(`Welcome, ${user.username}!`);
            renderDashboard();
        } catch (error) {
            console.error("login error:", error);
            alert("Login failed. Please try again later.");
        };
    });
};