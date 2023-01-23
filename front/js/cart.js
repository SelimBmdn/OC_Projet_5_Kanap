
fetch("http://localhost:3000/api/products")

  .then((res) => res.json())

  .then((lesProduits) => {
    affichageBasket(lesProduits);
  })

  .catch((err) => {
    // Une erreur est survenue
  });


  function affichageBasket(index) {
    // on récupère le panier converti 
    let basket = JSON.parse(localStorage.getItem("basket"));
    // si il y a un panier avec une taille differante de 0 (donc supérieure à 0)
     if (basket && basket.length != 0) {
      for (let choix of basket) {
        console.log(choix);
        for (let g = 0, h = index.length; g < h; g++) {
          if (choix._id === index[g]._id) {
            // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
            choix.name = index[g].name;
            choix.prix = index[g].price;
            choix.image = index[g].imageUrl;
            choix.description = index[g].description;
            choix.alt = index[g].altTxt;
          }
        }
      }
      // on joue affiche,  panier a des clefs/valeurs ajoutés que l'on a pas remonté dans le local storage et sont pourtant réèlles
      // ici panier à les valeurs du local storage + les valeurs définies au dessus
      //on demande à affiche() de jouer avec les données panier 
      //les valeurs ajoutés à panier ont un scope agrandi puisque appelé via la fonction affiche() d'ailleur dans affiche() il n'y a pas d'appel à panier de local storage.
      affiche(basket);
    } else {
      // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
      document.querySelector("#totalQuantity").innerHTML = "0";
      document.querySelector("#totalPrice").innerHTML = "0";
      document.querySelector("h1").innerHTML =
        "Panier vide";
    }
    // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
    changeQuantity();
    removeFromBasket();
  } 

  
  //--------------------------------------------------------------
  //Fonction d'affichage d'un panier (tableau)
  //--------------------------------------------------------------
  function affiche(indexé) {
    // on déclare et on pointe la zone d'affichage
    let zonePanier = document.querySelector("#cart__items");
    // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
    zonePanier.innerHTML += indexé.map((choix) => 
    `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.colors}" data-quantité="${choix.quantity}" data-prix="${choix.prix}"> 
      <div class="cart__item__img">
        <img src="${choix.image}" alt="${choix.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${choix.name}</h2>
          <span>couleur : ${choix.colors}</span>
          <p data-prix="${choix.prix}">${choix.prix} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.colors}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
      ).join(""); //on remplace les virgules de jonctions des objets du tableau par un vide
    // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données
    getNumberProduct();
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
      /*foundProduct.quantity++;*/
    } else {
        product.quantity = quantity;
        basket.push(product);
    }
  
    saveBasket(basket);

  }

  function removeFromBasket(product) {
    const cartdelete = document.querySelectorAll(".cart__item .deleteItem") ;
    /*cartdelete.addEventListener("click",)

    */
    let basket = getBasket();
    basket = basket.filter(p => p._id != product._id);
    saveBasket(basket);
    
  }

  function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct.quantity <=0) {
        removeFromBasket(foundProduct);
      } else {
        saveBasket(basket);
      }
      
    }
  }

  function getNumberProduct () {
    let basket = getBasket()
    let number = 0;
    for (let product of basket) {
      number += product.quantity;
    }
    return number;
  }
  
  function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
      total += product.quantity * product.price;
    }
    return total;
  }
