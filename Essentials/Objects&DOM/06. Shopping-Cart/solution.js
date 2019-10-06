function solve() {
   let cart = [];
   let totalPrice = 0;
   let allProductsAddBtn = document.querySelectorAll(".add-product");

   Array.from(allProductsAddBtn)
       .map(addBtn => addBtn.addEventListener("click", addProductToCartHandler));

   function addProductToCartHandler(event) {
       let product = event.target.parentNode.parentNode;
       let productName = product.querySelector(".product-title").textContent;
       let productPrice = Number(product.querySelector(".product-line-price").textContent);

       addProductToCart(productName, productPrice);
       addProductToCheckoutDetails(productName, productPrice);
   }

   let checkOutDetails = document.querySelector("textarea");
   
   function addProductToCheckoutDetails(name, price) {
       let displayDetails = `Added ${name} for ${price.toFixed(2)} to the cart.\n`;
       checkOutDetails.textContent += displayDetails;
   }

   function addProductToCart(name, price) {
       if (!cart.includes(name)) {
           cart.push(name);
       }
       totalPrice += price;
   }

    let checkoutBtn = document.querySelector(".checkout");

   let checkoutHandler = function () {
       disableAddButtons(allProductsAddBtn);
       checkoutBtn.disabled = true;
       checkOutDetails.textContent += `You bought ${cart.join(", ")} for ${totalPrice.toFixed(2)}.`
   };

   function disableAddButtons(addProductButtons) {
       Array.from(addProductButtons).forEach(button => button.disabled = true);
   }

   checkoutBtn.addEventListener("click", checkoutHandler);
}