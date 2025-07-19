document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary elements
    const productCards = document.querySelectorAll('.card');
    const totalPriceElement = document.querySelector('.total');
    
    // Initialize total price
    let totalPrice = 0;
    
    // Calculate initial total price
    function calculateInitialTotal() {
        totalPrice = 0;
        productCards.forEach(card => {
            const price = parseFloat(card.querySelector('.unit-price').textContent);
            const quantity = parseInt(card.querySelector('.quantity').textContent);
            totalPrice += price * quantity;
        });
        updateTotalPrice();
    }
    
    // Update total price display
    function updateTotalPrice() {
        totalPriceElement.textContent = `${totalPrice} $`;
    }
    
    // Initialize event listeners for each product card
    productCards.forEach(card => {
        // Quantity controls
        const minusBtn = card.querySelector('.fa-minus-circle');
        const plusBtn = card.querySelector('.fa-plus-circle');
        const quantityElement = card.querySelector('.quantity');
        const priceElement = card.querySelector('.unit-price');
        const price = parseFloat(priceElement.textContent);
        
        // Like button
        const likeBtn = card.querySelector('.fa-heart');
        
        // Delete button
        const deleteBtn = card.querySelector('.fa-trash-alt');
        const cardBody = card.closest('.card-body');
        
        // Minus button click
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                totalPrice -= price;
                updateTotalPrice();
            }
        });
        
        // Plus button click
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            totalPrice += price;
            updateTotalPrice();
        });
        
        // Like button click
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            // Change color to red when liked
            if (this.classList.contains('liked')) {
                this.style.color = 'red';
            } else {
                this.style.color = '';
            }
        });
        
        // Delete button click
        deleteBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityElement.textContent);
            totalPrice -= price * quantity;
            cardBody.remove(); // Remove the entire card
            updateTotalPrice();
        });
    });
    
    // Calculate initial total when page loads
    calculateInitialTotal();
});