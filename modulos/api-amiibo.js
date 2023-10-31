export function AmiiboSearch() {
    const d = document,
      $amiibos = d.querySelector(".amiibos"),
      $links = d.querySelector(".links");
  
      let amiiboAPI = "https://www.amiiboapi.com/api/amiibo/?name=mario";
  
      async function loadAmiibo(url) {
        try {
          $amiibos.innerHTML = `<span class="loader"></span>`;
    
          let res = await fetch(url);
    
          if (!res.ok) throw "Error al acceder a la API de Pokemons";
    
          let json = await res.json(),
            $template = "",
            $prevLink,
            $nextLink;
    
          console.log(json);
    
          for (let i = 0; i < json.results.length; i++) {
            //console.log(json.results[i]);
            try {
              let res = await fetch(json.results[i].url);
    
              if (!res.ok)
                throw `Error al cargar la información del pokemon ${json.results[i].name}`;
    
              let amiibo = await res.json();
              //console.log(res, pokemon);
    
              $template += `
                <figure>
                  <img src="${amiibo.image}" alt="${amiibo.name}">
                  <figcaption>${amiibo.name}</figcaption>
                </figure>
              `;
            } catch (error) {
              //console.warn(error);
              $template += `
                <figure>
                  <figcaption><b>${error}</b></figcaption>
                </figure>
              `;
            }
          } //for
    
          $amiibos.innerHTML = $template;
          $prevLink = json.previous ? `<a href="${json.previous}">⏪</a>` : "";
          $nextLink = json.next ? `<a href="${json.next}">⏩</a>` : "";
          $links.innerHTML = $prevLink + " " + $nextLink;
        } catch (error) {
          //console.warn(error);
          $amiibos.innerHTML = `<p><b>${error}</b></p>`;
        }
      }
    
      d.addEventListener("DOMContentLoaded", (e) => loadAmiibo(amiiboAPI));
    
      d.addEventListener("click", (e) => {
        if (!e.target.matches(".links a")) return false;
        e.preventDefault();
        loadPokemons(e.target.getAttribute("href"));
      });
  }