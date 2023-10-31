async function obtenerDatosLocales() {
  let response = await fetch("./data.json");
  console.log(response);
  let data = await response.json();
  console.log(data);


  let $mats = document.querySelector("#info-shida");
  let materiasYeahHTML = "";

  data.Materias.forEach(function (el) {
    materiasYeahHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card" style="width: 18rem;">          
          <div class="card-body">
            <h5 class="card-title">${el.nombre_Materia}</h5>
            <p class="card-text">${el.nombre_del_Docente}</p>
            <p class="card-text">${el.descripcion}</p>
          </div>
        </div>
      </div>
    `;
  });

  $mats.innerHTML = materiasYeahHTML;
}


import { tvMazeSearch } from "./modulos/api-tv-maze.js";
import { AmiiboSearch } from "./modulos/api-amiibo.js";
import { showPokemons } from "./modulos/api-pokemons.js";


AmiiboSearch();
tvMazeSearch("#search", ".shows");
showPokemons();
obtenerDatosLocales();
