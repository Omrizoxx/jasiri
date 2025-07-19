document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.card');
    const totalPriceElement = document.querySelector('.total');
    
    let totalPrice = 0;
    
    
    function calculateInitialTotal() {
        totalPrice = 0;
        productCards.forEach(card => {
            const price = parseFloat(card.querySelector('.unit-price').textContent);
            const quantity = parseInt(card.querySelector('.quantity').textContent);
            totalPrice += price * quantity;
        });
        updateTotalPrice();
    }
    
    function updateTotalPrice() {
        totalPriceElement.textContent = `${totalPrice} $`;
    }
    
    productCards.forEach(card => {
        
        const minusBtn = card.querySelector('.fa-minus-circle');
        const plusBtn = card.querySelector('.fa-plus-circle');
        const quantityElement = card.querySelector('.quantity');
        const priceElement = card.querySelector('.unit-price');
        const price = parseFloat(priceElement.textContent);
        
    
        const likeBtn = card.querySelector('.fa-heart');
        
        const deleteBtn = card.querySelector('.fa-trash-alt');
        const cardBody = card.closest('.card-body');
        
    
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                totalPrice -= price;
                updateTotalPrice();
            }
        });
        
        
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            totalPrice += price;
            updateTotalPrice();
        });
        
        
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
        
            if (this.classList.contains('liked')) {
                this.style.color = 'red';
            } else {
                this.style.color = '';
            }
        });
        
        
        deleteBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityElement.textContent);
            totalPrice -= price * quantity;
            cardBody.remove(); /
            updateTotalPrice();
        });
    });
    
    calculateInitialTotal();
});