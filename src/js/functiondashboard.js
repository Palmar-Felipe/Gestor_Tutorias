//This file shows the code for the dashboard functionality.

//Imported view rendering function.
import { renderStart } from "../views/start";

//Endpoint URL for the courses.
const URL = "http://localhost:3000/lenguajes"; // This changes to your API endpoint
 
//Exported function of the dashboard functionality.
export function afterDashboard() {
  const grid = document.getElementById("courses-grid");
  const form = document.getElementById("form-course");
  const name = document.getElementById("language-name");
  const description = document.getElementById("language-description");
  const image = document.getElementById("language-image");

  let editMode = false;
  let idEdit = null;

  //Button to create a new course.
  const btnCreate = document.getElementById("btn-create");

  const show = JSON.parse(localStorage.getItem("usuario"));

  if (show && show.rol === "coder") {
    const btnCreateHidden = document.getElementById("btn-create");

    if (btnCreateHidden) btnCreateHidden.style.display = "none";
  }

  //Log out functionality.
  document.getElementById("log-out").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    renderStart();
  });

  btnCreate.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
    form.reset();
    editMode = false;
  });

  //Form to edit a course.
  form.addEventListener("submit", async () => {
    const newCourse = {
      name: name.value,
      description: description.value,
      image: image.value,
    };

    if (editMode) {
      await fetch(`${URL}/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
    } else {
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
    }

    form.reset();
    form.style.display = "none";
    uploadCourses();
  });

  //Function to upload courses.
  async function uploadCourses() {
    const res = await fetch(URL);
    const courses = await res.json();

    grid.innerHTML = ""; // Clean the grid before adding new courses.

    //HTML structure of the course cards.
    courses.forEach((course) => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
                <h3>${course.name}</h3>
                <img src="${course.image}" alt="imagen de ${course.name}">
                <p>${course.description}</p>
                <button class="btn-edit">Editar</button>
                <button class="btn-edit">inscribirse</button>
                <button class="btn-delete">Eliminar</button>
            `;

      //Edit and delete functionality for each course.
      const btnEdit = card.querySelector(".btn-edit");
      const btnDelete = card.querySelector(".btn-delete");

      const showContent = JSON.parse(localStorage.getItem("usuario"));

        if (showContent && showContent.rol === "coder") {
          const btnEditHidden = card.querySelector(".btn-edit");
          const btnDeleteHidden = card.querySelector(".btn-delete");

          if(btnEditHidden) btnEditHidden.style.display = "none";
          if (btnDeleteHidden) btnDeleteHidden.style.display = "none";
        }

      btnEdit.addEventListener("click", () => {
        name.value = course.name;
        description.value = course.description;
        image.value = course.image;
        form.style.display = "block";
        editMode = true;
        idEdit = course.id;
      });

      btnDelete.addEventListener("click", async () => {
        if (confirm("¿Estás seguro de eliminar este lenguaje?")) {
          await fetch(`${URL}/${course.id}`, { method: "DELETE" });
          uploadCourses();
        }
      });

      grid.appendChild(card);
    });
  }

  uploadCourses();
}
