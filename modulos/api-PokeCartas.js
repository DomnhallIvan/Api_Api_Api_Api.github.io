export function PokeCartasSearch(search, selector){
    const d = document,
      $cartas = d.querySelector(selector),
      $search = d.querySelector(search);
  
    $search.addEventListener("keyup", async (e) =>{
      if (e.key === "Enter") {
        try{
          $cartas.innerHTML = `<span class="loader"></span>`;
          
          let query = e.target.value.toLowerCase(),
            res = await 
          fetch(`https://api.tcgdex.net/v2/es/cards/?name=${query}`);
          
          if (!res.ok) throw "Error al acceder a la API de PokeCartas";
          
          let json = await res.json(),
            $template = "";

          console.log(json);
  
          json.forEach((el) => {
           $template += `
              <div class="Cartas">
                <h3>${el.name}</h3>
                <img src="${el.image}" alt="${el.name}" />
                ${el.id}
              </div>
            `;
            })
            $cartas.innerHTML=$template;
        } catch(error){
          $cartas.innerHTML = `<p><b>${error}</b></p>`;
        }
      }
      
    });
  
    $search.addEventListener("search", (e) =>{
      $cartas.innerHTML = "";
    })
    
  }