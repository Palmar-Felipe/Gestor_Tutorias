//This file shows the code for the dashboard functionality.

//imported the auth
import {auth} from "./auth";

//Endpoint URL for the courses.
const urlLanguage = "http://localhost:3000/languages"; // This changes to your API endpoint
const urlComments = "http://localhost:3000/comments"; // This changes to your API endpoint

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

  if (show && show.role === "coder") {
    const btnCreateHidden = document.getElementById("btn-create");

    if (btnCreateHidden) btnCreateHidden.style.display = "none";
  }

  //Log out functionality.
  document.getElementById("log-out").addEventListener("click", (e) => {
    e.preventDefault();
    auth.logout();
    console.log("Already closed")
    alert("session closed")
  });

  btnCreate.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
    form.reset();
    editMode = false;
  });

  //Form to edit a course.
  form.addEventListener("submit", async (a) => {
    a.preventDefault();

    const newCourse = {
      name: name.value,
      description: description.value,
      image: image.value,
    };

    if (editMode) {
      await fetch(`${urlLanguage}/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
    } else {
      await fetch(urlLanguage, {
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
    const res = await fetch(urlLanguage);
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
        <button class="btn-subscrib">Inscribirse</button>
        <button class="btn-delete">Eliminar</button>
        <button class="btn-comments" data-id="${course.id}">Comentarios</button>
        <section hidden class="section-comments" id="sectionComments-${course.id}">
          <h4>Comments for ${course.name}</h4>
          <form class="form-comments" id="formComments-${course.id}" data-course-id="${course.id}">
            <label for="nameUser-${course.id}">Name:</label>
            <input type="text" id="nameUser-${course.id}" required> <br> <br>
            <label for="comment-${course.id}">Comment:</label>
            <textarea id="comment-${course.id}" required></textarea> <br> <br>
            <button type="submit" id="sendComment-${course.id}">Send Comment</button>
          </form>
          <div class="comments-list" id="commentsList-${course.id}"></div>
        </section>
      `;

      grid.appendChild(card);

      //Buttons for subscribing, editing, deleting, and commenting on each course.
      const btnSubs = card.querySelector(".btn-subscrib");
      const btnEdit = card.querySelector(".btn-edit");
      const btnDelete = card.querySelector(".btn-delete");
      const btnComments = card.querySelector(".btn-comments");

      btnSubs.addEventListener("click", async (i) => {
        i.preventDefault();
        alert("Inscripción exitosa");
      });

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
          await fetch(`${urlLanguage}/${course.id}`, { method: "DELETE" });
          uploadCourses();
        }
      });

      //Functionality for comments.
      const sectionComments = card.querySelector(`#sectionComments-${course.id}`);
      const formComments = card.querySelector(`#formComments-${course.id}`);
      const nameUserInput = card.querySelector(`#nameUser-${course.id}`);
      const commentTextInput = card.querySelector(`#comment-${course.id}`);
      const commentsList = card.querySelector(`#commentsList-${course.id}`);

      btnComments.addEventListener("click", () => {
        sectionComments.hidden = !sectionComments.hidden;
        if (!sectionComments.hidden) {
          showComments(course.id, commentsList);
        }
      });

      //Functionality to send a comment.
      formComments.addEventListener("submit", async (e) => {
        e.preventDefault();
        const authorComment = nameUserInput.value.trim();
        const textComment = commentTextInput.value.trim();

        if (authorComment && textComment) {
          try {
            const newComment = {
              author: authorComment,
              text: textComment,
              date: new Date().toISOString(),
              courseId: course.id,
              parentId: null,
            };
            await fetch(urlComments, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newComment),
            });
            nameUserInput.value = "";
            commentTextInput.value = "";
            showComments(course.id, commentsList);
          } catch (error) {
            console.error("Error al enviar el comentario:", error);
            alert("Hubo un problema con el servidor.");
          }
        } else {
          alert("Por favor, completa todos los campos.");
        }
      });

      //Function to upload and show comments just in one specific course.
      async function showComments(courseId, commentsListElement) {
        try {
          const response = await fetch(`${urlComments}?courseId=${courseId}`);
          const planeComments = await response.json();
          commentsListElement.innerHTML = ""; // Clear previous comments

          const treeAnidado = buildTree(planeComments);

          commentsListElement.innerHTML = "";

          if (treeAnidado.length === 0) {
            commentsList.innerHTML = "<p>No hay comentarios aún.</p>";
          } else {
            treeAnidado.forEach((comment) => {
              renderComment(comment, commentsListElement, courseId, commentsListElement);
            });
          }

          commentsListElement.querySelectorAll(".buttonResponse").forEach((button) => {
            button.addEventListener("click", (e) => {
              const commentId = e.target.dataset.commentId;
              showResponseForm(commentId, e.target.nextElementSibling, courseId, commentsListElement);
            });
          });

        } catch (error) {
          console.error("Error al cargar comentarios:", error);
          commentsListElement.innerHTML = "<p>Error al cargar comentarios.</p>";
        }
      }

      // Function to build a comment tree.
      function buildTree(planeComments) {
        const commentsById = {};
        const commentsOrigin = [];

        planeComments.forEach((comment) => {
          comment.respuestas = []; // Use 'respuestas' for consistency with frontend logic.
          commentsById[comment.id] = comment;
        });

        planeComments.forEach((comment) => {
          if (comment.parentId !== null) {
            const parentComment = commentsById[comment.parentId];
            if (parentComment) {
              parentComment.respuestas.push(comment); // Usar 'respuestas'
            }
          } else {
            commentsOrigin.push(comment);
          }
        });
        return commentsOrigin;
      }

      // Function to render a comment and its replais.
      function renderComment(comment, parentContainer, courseId, commentsListElement) {
        // commentsListElement as a parameter
        const divComment = document.createElement("div");
        divComment.classList.add("commentItem");
        if (comment.parentId) {
          divComment.classList.add("responseItem"); // Most consistent class name
        }

        divComment.innerHTML = `
          <p class="commentFromAuthor">${comment.author}<span class="dateComment">${new Date(comment.date).toLocaleString()}</span></p>
          <p class="commentFromText">${comment.text}</p>
          <button class="buttonResponse" data-comment-id="${comment.id}">Reply</button>
          <div class="containerResponse"></div>
        `;
        parentContainer.appendChild(divComment);

        const containerResponse = divComment.querySelector(".containerResponse"); // Corrected selector

        if (comment.respuestas && comment.respuestas.length > 0) {
          // Use 'respuestas'
          comment.respuestas.forEach((response) => {
            renderComment(response, containerResponse, courseId, commentsListElement); // commentsListElement as a parameter.
          });
        }
      }

      // Function to show the response form.
      function showResponseForm(parentId, containerAnswer, courseId, commentsListElement) {
        // commentsListElement as a parameter
        const existingForm = containerAnswer.querySelector(".formResponse");
        if (existingForm) {
          existingForm.remove();
          return;
        }

        const formResponse = document.createElement("form");
        formResponse.classList.add("formResponse");
        formResponse.innerHTML = `
          <label for="response-name-${parentId}">Your Name:</label>
          <input type="text" id="response-name-${parentId}" required> <br>
          <label for="response-text-${parentId}">Reply:</label><br>
          <textarea id="response-text-${parentId}" rows="2" required></textarea><br>
          <button type="submit">Reply</button>
          <button type="button" class="cancelReply">Cancel Reply</button>
        `;
        containerAnswer.prepend(formResponse);

        formResponse.addEventListener("submit", async (evento) => {
          evento.preventDefault();
          const author = formResponse.querySelector(`#response-name-${parentId}`).value.trim();
          const text = formResponse.querySelector(`#response-text-${parentId}`).value.trim();

          if (author && text) {
            try {
              const newComment = {
                author: author,
                text: text,
                date: new Date().toISOString(),
                courseId: courseId,
                parentId: parseInt(parentId),
              };

              await fetch(urlComments, {
                // Use urlComments
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
              });

              formResponse.remove();
              showComments(courseId, commentsListElement); // Recargar comentarios del curso actual
            } catch (error) {
              console.error("No fue posible enviar la respuesta:", error);
              alert("Hubo un problema al conectar con el servidor");
            }
          } else {
            alert("Por favor, escribe tu nombre y una respuesta.");
          }
        });

        formResponse.querySelector(".cancelReply").addEventListener("click", () => {
          formResponse.remove();
        });
      }

      //Functionality for hidde the botons of subscribing, editing, and deleting based on user role.
      const showContentAdmin = JSON.parse(localStorage.getItem("usuario"));

      if (showContentAdmin && showContentAdmin.role === "admin") {
        const btnSubsHidden = card.querySelector(".btn-subscrib");
        if (btnSubsHidden) btnSubsHidden.style.display = "none";
      }

      const showContent = JSON.parse(localStorage.getItem("usuario"));

      if (showContent && showContent.role === "coder") {
        const btnEditHidden = card.querySelector(".btn-edit");
        const btnDeleteHidden = card.querySelector(".btn-delete");

        if (btnEditHidden) btnEditHidden.style.display = "none";
        if (btnDeleteHidden) btnDeleteHidden.style.display = "none";
      }
    });
  }

  uploadCourses();
}
