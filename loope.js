document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'total_price') {
                var totalPrice = processPriceElement(mutation.target);
                console.log('Total Price:', totalPrice);
                observer.disconnect(); // Disconnect observer after processing

                sendOrderItemIDs().then(orderId => {
                    initiateCheckout(totalPrice, orderId);
                }).catch(error => {
                    console.error('Error fetching order ID:', error);
                });
            }
        });
    });

    function processPriceElement(element) {
        // ... (Your existing processPriceElement function)
    }

    async function sendOrderItemIDs() {
        var itemIDs = [];
        var itemElements = document.querySelectorAll('.order_item_id');

        itemElements.forEach(function(item) {
            itemIDs.push(item.innerText.trim());
        });

        const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:Umv0ZEEu/newOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'itemIDs': itemIDs })
        });

        const data = await response.json();
        return data.result; // Assuming the backend returns an object with orderId
    }

    function initiateCheckout(TotalPrice, OrderId) {
        fetch("https://x8ki-letl-twmt.n7.xano.io/api:IpK0Jirl/Initiate_checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'totalPrice': TotalPrice,
                'orderId': OrderId // Using the Order ID from the backend
            })
        })
        // ... (Rest of your existing initiateCheckout function)
    }

    var config = { attributes: true, childList: true, subtree: true };
    var targetNode = document.getElementById('total_price');
    // ... (Rest of your existing MutationObserver setup)
});
