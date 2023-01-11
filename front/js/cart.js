


fetch("http://localhost:3000/api/products")

.then((res) =>  res.json())

  .then((lesProduits) => {
     lesKanaps(lesProduits);
  } )
  
  .catch((err) => {
    // Une erreur est survenue
  });
