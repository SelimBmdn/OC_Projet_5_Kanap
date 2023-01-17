
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

/*

// ajout panier par le "click"

let choixProduit = document.querySelector("#addToCart");
let choixQuantité = document.querySelector("quantity");
let quantitéProduit;

choixQuantité.addEventListener("input", () => {


    articleClient.quantité = quantitéProduit;

    document.querySelector("addToCard").style.colors = "white";
    document.querySelector("addToCard").textContent = "Ajouter au panier";

})

choixProduit.addEventListener("click", () => {
    //conditions de validation du bouton ajouter au panier
    if (
        articleClient.quantité < 1 ||
        articleClient.quantité > 100 ||
        articleClient.quantité === undefined ||
        articleClient.couleur === "" ||
        articleClient.couleur === undefined
    ) {
        alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");

    } else {
        getBasket()
        
        document.querySelector("addToCard").style.colors = "rgb(52,168,83)";
        document.querySelector("addToCard").textContent = "Produit ajouté";


    }
});

*/



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
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity = foundProduct.quantity + quantity;

    } else {
        product.quantity = quantity;
        basket.push(product);
    }

    saveBasket(basket);

}

*/



