// Show menu on page load
document.addEventListener("DOMContentLoaded", getMenu);
// document.getElementById("order-button").addEventListener("click", handleOrderProcess);

// Part 1: Fetch and display the menu
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json'); // Replace with actual path
        const menuData = await response.json();
        displayMenu(menuData);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}

function displayMenu(menuItems) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";
    menuItems.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
             <img src="${item.imgSrc}">
            <h3>${item.name}</h3>
            <span>Price: $${item.price}</span>
            <button class="order-button">+</button>
        `;
        menuContainer.appendChild(menuItem);
    });
    document.querySelectorAll(".order-button").forEach(button => {
        button.addEventListener("click", handleOrderProcess);
    });
}



// Part 2: Simulate taking an order
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ["Classic Burger", "Cheese Burger", "Veggie Burger", "Chicken Burger", "panner Burger", "pizza", "Fried Chicken", "Pasta", "Grilled Cheese Sandwich"];
            const order = {
                items: burgers.sort(() => 0.5 - Math.random()).slice(0, 3)
            };
            resolve(order);
        }, 2500);
    });
}

// Part 3: Simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1000);
    });
}

// Part 4: Simulate payment
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Part 5: Thank you message function
function thankyouFnc() {
    alert("Thank you for your order!");
}

// Part 6: Handle the complete order process
async function handleOrderProcess() {
    try {
        // Hide the menu screen and show the order screen
        document.getElementById("menu-screen").style.display = "none";
        document.getElementById("order-screen").style.display = "block";

        const order = await takeOrder();
        document.getElementById("order-status").innerText = "Order placed: " + order.items.join(", ");

        const prepStatus = await orderPrep();
        document.getElementById("order-status").innerText = "Order is being prepared...";

        const paymentStatus = await payOrder();
        if (paymentStatus.paid) {
            document.getElementById("order-status").innerText = "Order paid successfully!";
            thankyouFnc();
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred during the ordering process. Please try again.");
    }
}
// Get the "Your Order" item and the order message container
document.getElementById("your-order").addEventListener("click", () => {
    // Hide other sections if necessary
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("order-screen").style.display = "none";

    // Show the order message
    document.getElementById("order-message").style.display = "block";
});
