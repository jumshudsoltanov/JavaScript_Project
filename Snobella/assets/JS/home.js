// Giriş edən istifadəçini al
async function getLoggedInUser() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();
  return users.find(user => user.login === true);
 

}

async function updateUserData(user) {
  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
}


async function fetchAndRenderProducts() {
  const res = await fetch("http://localhost:3000/products");
  const products = await res.json();
  const container = document.querySelector(".productContainer");
  container.innerHTML = ""; 

  const loggedInUser = await getLoggedInUser();

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = product.image_url;
    img.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.className = "card-text text-muted";
    desc.textContent = product.description;

    const price = document.createElement("p");
    price.className = "fw-bold";
    price.textContent = product.price + " ₼";


    const wishlistBtn = document.createElement("button");
    wishlistBtn.className = "btn btn-outline-danger d-block mx-auto mb-2";
    wishlistBtn.textContent = "Add to Wishlist";
    wishlistBtn.dataset.id = product.id;


    const cartBtn = document.createElement("button");
    cartBtn.className = "btn btn-outline-primary d-block mx-auto mb-2";
    cartBtn.textContent = "Add to Cart";
    cartBtn.dataset.id = product.id;


    wishlistBtn.addEventListener("click", async () => {
      const user = await getLoggedInUser();

      if (!user) {
        alert("Zəhmət olmasa, giriş edin!");
        return;
      }

      if (!user.wishlist) user.wishlist = [];

      const alreadyInWishlist = user.wishlist.includes(product.id);

      if (alreadyInWishlist) {

        user.wishlist = user.wishlist.filter(id => id !== product.id);
        wishlistBtn.textContent = "Add to Wishlist";
      } else {

        user.wishlist.push(product.id);
        wishlistBtn.textContent = "Remove from Wishlist";
      }

      await updateUserData(user);
    });


    cartBtn.addEventListener("click", async () => {
      const user = await getLoggedInUser();

      if (!user) {
        alert("Zəhmət olmasa, giriş edin!");
        return;
      }

      if (!user.cart) user.cart = [];

      const alreadyInCart = user.cart.includes(product.id);

      if (alreadyInCart) {
 
        user.cart = user.cart.filter(id => id !== product.id);
        cartBtn.textContent = "Add to Cart";
      } else {

        user.cart.push(product.id);
        cartBtn.textContent = "Remove from Cart";
      }

      await updateUserData(user);
    });


    if (loggedInUser && loggedInUser.wishlist && loggedInUser.wishlist.includes(product.id)) {
      wishlistBtn.textContent = "Remove from Wishlist";
    }


    if (loggedInUser && loggedInUser.cart && loggedInUser.cart.includes(product.id)) {
      cartBtn.textContent = "Remove from Cart";
    }


    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(price);
    cardBody.appendChild(wishlistBtn);
    cardBody.appendChild(cartBtn);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
}


document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
