


fetch("http://localhost:3000/api/products")

  .then((res) => res.json())

  .then((lesProduits) => {
    affichageBasket(lesProduits);
  })

  .catch((err) => {
    // Une erreur est survenue
  });


function affichageBasket(index)

let basket = JSON.parse(localStorage.getItem("product"));
//  panier avec une taille differante de 0 (donc supérieure à 0)
if (panier && panier.length != 0) {

for (let choix of basket) {
  console.log(choix);

    for (let g = 0, h = index.length; g < h; g++)  {

    // produit deja enregistré dans local storage
    if (choix._id === index[g]._id) {
      choix.name = index[g].name;
      choix.prix = index[g].price;
      choix.image = index[g].imageUrl;
      choix.description = index[g].description;
      choix.alt = index[g].altTxt;
    }
  }
}

  affiche(basket);

} /* else {

  document.querySelector("#totalQuantity").innerHTML = "0";
  document.querySelector("#totalPrice").innerHTML = "0" ;
  document.querySelector("h1").innerHTML = "Panier Vide"; 
} */ ;

function affiche(indexé) {

  let zonePanier = document.querySelector("#cart_items");
  
  for (let choix of indexé) {

    zonePanier.innerHTML += '<article class="cart__item" data-id="${choix._id}" data-color="${choix.colors}" data-quantité="${choix.quantity}" data-prix="${choix.prix}">

      <div class="cart__item__img">

   <img src="${choix.image}" alt="${choix.alt}">

   </div> 

   <div class="cart__item__content">

       <div class="cart__item__content__description">

         <h2>${choix.name}</h2>
         <p>couleur : ${choix.colors}</p>
         <p>data-prix="${choix.prix}"</p>
       </div>
       <div class="cart__item__content__settings">
         <div class="cart__item__content__settings__quantity">
           <p>Qté : </p>
           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantity}">
           </></div>
         <div class="cart__item__content__settings__delete">
           <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.colors}">Supprimer</p>
         </div>
       </div>
     </div></></>
</article > ' 

  }


}







  // gestion local storage

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
      return [];
  } else {
      return JSON.parse(basket);
  }
}

function addBasket(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find(p => p._id == product._id);
  if (foundProduct != undefined) {
      foundProduct.quantity = parseInt(quantity) + parseInt(foundProduct.quantity) ;

  } else {
      product.quantity = quantity;
      basket.push(product);
  }

  saveBasket(basket);

  }

  function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);

  }


