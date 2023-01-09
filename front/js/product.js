
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

fetch("http://localhost:3000/api/products")

.then((res) =>  res.json())

  .then((lesProduits) => {
     lesKanaps(lesProduits);
  } )
  
  .catch((err) => {
    // Une erreur est survenue
  });



  function lesKanaps(product) {

        let affichage = document.querySelector("#item") ;
        let imageAlt = document.querySelector("article div.item__img")
        let titre = document.querySelector("#title")
        let description = document.querySelector("#description")
        let prix = document.querySelector("#price")
        /* let color = document.querySelector("#colors") */

    for (let article of product) {

        if (id === article._id) {
        
            imageAlt.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;

            titre.textContent = `${article.name}`;

            prix.textContent = `${article.price}`;

            description.textContent = `${article.description}`;
         
          }
        }
        console.log("affichage ok");
        }
    
  
  