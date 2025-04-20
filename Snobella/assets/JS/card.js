const productsContainer = document.getElementById("products");

const api = "http://localhost:3616";

async function getCurrentUser() {
  const res = await fetch(`${api}/users`);
  const users = await res.json();
  return users.find(user => user.login === true);
}


async function renderProducts() {
  const res = await fetch(`${api}/products`);
  const products = await res.json();

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.price}₼</strong></p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });

  addCartEventListeners();
}

// Add to Cart düyməsinə click event
function addCartEventListeners() {
  document.querySelectorAll("button[data-id]").forEach(button => {
    button.addEventListener("click", async (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const user = await getCurrentUser();

      if (!user) {
        alert("Zəhmət olmasa login olun.");
        return;
      }

   
      if (user.cart.includes(productId)) {
        alert("Bu məhsul artıq səbətdədir.");
        return;
      }

      const updatedCart = [...user.cart, productId];

      await fetch(`${api}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart: updatedCart })
      });

      alert("Məhsul səbətə əlavə olundu!");
    });
  });
}

renderProducts();
