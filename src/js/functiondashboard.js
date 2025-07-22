import { renderStart } from "../views/start";

const URL = "http://localhost:3000/lenguajes"; // Cambia a tu colección real
export function afterDashboard() {
  const grid = document.getElementById("cursos-grid");
  const form = document.getElementById("form-curso");
  const nombre = document.getElementById("nombre-lenguaje");
  const descripcion = document.getElementById("descripcion-lenguaje");
  const imagen = document.getElementById("imagen-lenguaje");

  let modoEditar = false;
  let idEditar = null;

  const btnCrear = document.getElementById("btn-crear");

  const show = JSON.parse(localStorage.getItem("usuario"));

  if (show && show.rol === "coder") {
    const btnCrearOculto = document.getElementById("btn-crear");

    if (btnCrearOculto) btnCrearOculto.style.display = "none";
  }

  document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    renderStart();
  });

  btnCrear.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
    form.reset();
    modoEditar = false;
  });

  form.addEventListener("submit", async () => {
    const nuevoCurso = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      imagen: imagen.value,
    };

    if (modoEditar) {
      await fetch(`${URL}/${idEditar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCurso),
      });
    } else {
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCurso),
      });
    }

    form.reset();
    form.style.display = "none";
    cargarCursos();
  });

  async function cargarCursos() {
    const res = await fetch(URL);
    const cursos = await res.json();

    grid.innerHTML = ""; // Limpiar

    cursos.forEach((curso) => {
      const card = document.createElement("div");
      card.className = "curso-card";
      card.innerHTML = `
                <h3>${curso.nombre}</h3>
                <img src="${curso.imagen}" alt="Imagen de ${curso.nombre}">
                <p>${curso.descripcion}</p>
                <button class="btn-editar">Editar</button>
                <button class="btn-editar">inscribirse</button>
                <button class="btn-eliminar">Eliminar</button>
            `;

      const btnEditar = card.querySelector(".btn-editar");
      const btnEliminar = card.querySelector(".btn-eliminar");

      const showContent = JSON.parse(localStorage.getItem("usuario"));

        if (showContent && showContent.rol === "coder") {
          const btnEditarOculto = card.querySelector(".btn-editar");
          const btnEliminarOculto = card.querySelector(".btn-eliminar");

          if(btnEditarOculto) btnEditarOculto.style.display = "none";
          if (btnEliminarOculto) btnEliminarOculto.style.display = "none";
        }

      btnEditar.addEventListener("click", () => {
        nombre.value = curso.nombre;
        descripcion.value = curso.descripcion;
        imagen.value = curso.imagen;
        form.style.display = "block";
        modoEditar = true;
        idEditar = curso.id;
      });

      btnEliminar.addEventListener("click", async () => {
        if (confirm("¿Estás seguro de eliminar este lenguaje?")) {
          await fetch(`${URL}/${curso.id}`, { method: "DELETE" });
          cargarCursos();
        }
      });

      grid.appendChild(card);
    });
  }

  cargarCursos();
}
