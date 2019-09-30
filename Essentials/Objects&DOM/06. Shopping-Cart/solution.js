function solve() {
   let products = document.getElementsByClassName("shopping-cart")[0]
       .getElementsByClassName("product");

   let cart = [];
   let totalPrice = 0;
   let productsAddBtn = [];

   for (const product of products) {
       let productName = product.getElementsByClassName("product-details")[0]
           .getElementsByClassName("product-title")[0]
           .textContent;
       let productPrice = +product.getElementsByClassName("product-line-price")[0]
           .textContent;

       let addButton = product.getElementsByClassName("product-add")[0]
           .getElementsByTagName("button")[0];

       productsAddBtn.push(addButton);
       addEventListenerToProductButton(productName, productPrice, addButton);
   }
   
   function addEventListenerToProductButton(name, price, addButton) {
       addButton.addEventListener("click", function () {
           addProductToCart(name, price);
           addProductToCheckoutDetails(name, price);
       })
   }

   let checkOutDetails = document.getElementsByTagName("textarea")[0];
   
   function addProductToCheckoutDetails(name, price) {
       let displayDetails = `Added ${name} for ${price} to the cart.\n`;
       checkOutDetails.textContent += displayDetails;
   }

   function addProductToCart(name, price) {
       if (!cart.includes(name)) {
           cart.push(name);
       }
       totalPrice += price;
   }

   let checkoutBtn = document.getElementsByClassName("checkout")[0];

   let checkout = function () {
       for (const button of productsAddBtn) {
           button.disabled = true;
       }
       checkoutBtn.disabled = true;
       checkOutDetails.textContent += `You bought ${cart.join(", ")} for ${totalPrice.toFixed(2)}.`
   };

   checkoutBtn.addEventListener("click", checkout);
}