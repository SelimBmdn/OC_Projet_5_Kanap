fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")

.then((res) =>  res.json())

  .then((lesProduits) => {
     console.table(lesProduits);
     lesKanaps(lesProduits);
  } )
  
  .catch((err) => {
    // Une erreur est survenue
  });
  /*

  let urlData = new URL (http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926)
*/
/*
  function lesKanaps(index) {

    let affichage = document.querySelector("#items") ;

    for (let article of index ) {
        
        affichage.innerHTML += `<a href="./product.html?id=${article._id107fb5b75607497b96722bda5b504926}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a>`
    }
  }*/