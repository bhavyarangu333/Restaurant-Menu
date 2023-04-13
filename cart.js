// Define an empty cart array to store the selected items
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
  cart.push(item);
}

// Function to remove an item from the cart
function removeFromCart(item) {
  let index = cart.indexOf(item);
  if (index > -1) {
    cart.splice(index, 1);
  }
}

// Function to display the items in the cart
function displayCart() {
  console.log("Cart Items: ", cart);
}

// Example usage
addToCart("Pizza");
addToCart("Burger");
addToCart("Fries");
displayCart();

removeFromCart("Burger");
displayCart();
