document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // If we are on the cart page, display the items.
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
});

/**
 * Retrieves the cart from localStorage.
 * @returns {Array} The cart items.
 */
function getCart() {
    return JSON.parse(localStorage.getItem('wemisiCart')) || [];
}

/**
 * Saves the cart to localStorage and updates the count in the header.
 * @param {Array} cart - The cart array to save.
 */
function saveCart(cart) {
    localStorage.setItem('wemisiCart', JSON.stringify(cart));
    updateCartCount();
}

/**
 * Adds a product to the shopping cart.
 * @param {HTMLElement} button - The "Add to Cart" button element.
 */
function addToCart(button) {
    const productInfo = button.closest('.product-info');
    const productName = productInfo.querySelector('h1').textContent.trim();
    const productPriceText = productInfo.querySelector('.price').textContent.trim();
    const price = parseFloat(productPriceText.replace(/[^0-9.-]+/g, ""));

    if (!productName || isNaN(price)) {
        console.error("Could not get product details from the page.");
        alert("Error: Could not add item to cart.");
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`'${productName}' has been added to your cart.`);
}

/**
 * Updates the cart item count displayed in the header.
 */
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCountSpan = document.getElementById('cart-count');
    cartCountSpan.innerText = cart.length;
}

// Call updateCartCount on page load and after removing items
updateCartCount();

/**
 * Displays the cart items on the cart page.
 */
function displayCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>Ksh ${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" class="form-control" style="width: 80px;"></td>
                <td>Ksh ${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

function updateQuantity(index, quantity) {
    const cart = getCart();
    const newQuantity = parseInt(quantity);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart.splice(index, 1); // Remove item if quantity is 0 or less
    }
    saveCart(cart);
    displayCartItems();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCartItems();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('wemisiCart');
        updateCartCount();
        displayCartItems();
    }
}

function checkoutWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello WEMISI, I would like to order the following items:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) - Ksh ${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });

    message += `\n*Total: Ksh ${total.toFixed(2)}*`;
    
    const phoneNumber = "254721202052";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}