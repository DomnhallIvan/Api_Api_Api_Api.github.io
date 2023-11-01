export function amiiboSearch(search, selector){
  const d = document,
    $amiibo = d.querySelector(selector),
    $search = d.querySelector(search);

  $search.addEventListener("keyup", async (e) =>{
    if (e.key === "Enter") {
      try{
        $amiibo.innerHTML = `<span class="loader"></span>`;
        
        let query = e.target.value.toLowerCase(),
          res = await 
        fetch(`https://amiiboapi.com/api/amiibo/?name=${query}`);
        
        if (!res.ok) throw "Error al acceder a la API de Amiibo";
        
        let json = await res.json(),
        ami= json.amiibo,
          
          $template = "";
        console.log(json);
        console.log(ami);

        ami.forEach((el) => {
         $template += `
            <div class="amiibo">
              <h3>${el.character}</h3>
              <img src="${el.image}" alt="${el.character}" />
              ${el.amiiboSeries}
            </div>
          `;
          })
        $amiibo.innerHTML=$template;
      } catch(error){
        $amiibo.innerHTML = `<p><b>${error}</b></p>`;
      }
    }
    
  });

  $search.addEventListener("search", (e) =>{
    $amiibo.innerHTML = "";
  })
  
}