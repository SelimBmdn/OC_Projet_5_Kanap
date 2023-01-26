
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

fetch("http://localhost:3000/api/products")

    .then((res) => res.json())

    .then((lesProduits) => {
        lesKanaps(lesProduits);
    })

    .catch((err) => {
        // Une erreur est survenue
    });


let articleClient = {}; // Initialisation de la variable articleclient
// id du produit
articleClient._id = id; // Affectation de l'id à la propriété de la variable id de articleClient


function lesKanaps(product) {

    let item = document.querySelector("#item");
    let imageAlt = document.querySelector("article div.item__img")
    let titre = document.querySelector("#title")
    let description = document.querySelector("#description")
    let prix = document.querySelector("#price")
    let couleurOption = document.querySelector("#colors")

    for (let article of product) {

        if (id === article._id) {

            imageAlt.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
            titre.textContent = `${article.name}`;
            prix.textContent = `${article.price}`;
            description.textContent = `${article.description}`;

            for (let couleur of article.colors) {

                couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
            }

        }

    }
    console.log("affichage ok");
}

// ajout dans panier choix quantité et couleur

let choixCouleur = document.querySelector("#colors");

choixCouleur.addEventListener("input", (ec) => {
    let couleurProduit;
    couleurProduit = ec.target.value;
    // on ajoute la couleur à l'objet panierClient
    articleClient.couleur = couleurProduit;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
    console.log(couleurProduit);
});

let choixQuantité = document.querySelector('input[id="quantity"]');
let quantitéProduit;

choixQuantité.addEventListener("input", (eq) => {

    quantitéProduit = eq.target.value;
    articleClient.quantity = quantitéProduit;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
    console.log(quantitéProduit);
})

let choixProduit = document.querySelector("#addToCart");

choixProduit.addEventListener("click", () => {
    //conditions de validation du bouton ajouter au panier
    if (
        articleClient.quantity < 1 ||
        articleClient.quantity > 100 ||
        articleClient.quantity === undefined ||
        articleClient.couleur === "" ||
        articleClient.couleur === undefined
    ) {
        alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
        console.log("click refus");
    } else {

        addBasket(articleClient, articleClient.quantity );

        //getBasket();

        console.log("click ok");

        document.querySelector("#addToCart").style.color = "rgb(52,168,83)";
        document.querySelector("#addToCart").textContent = "Produit ajouté";
    }
});


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
    let foundProduct = basket.find(p => p._id == product._id );
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
    return number
  }
  
  function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
      total += product.quantity * product.price;
    }
    return total;
  }
/*
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
}*/