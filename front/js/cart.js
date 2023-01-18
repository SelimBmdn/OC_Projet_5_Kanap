


fetch("http://localhost:3000/api/products")

.then((res) =>  res.json())

  .then((lesProduits) => {
     lesKanaps(lesProduits);
  } )
  
  .catch((err) => {
    // Une erreur est survenue
  });


  

// gestion local storage
/*

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

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter(p => p.id != product.id);
  saveBasket(basket);

}
*/

