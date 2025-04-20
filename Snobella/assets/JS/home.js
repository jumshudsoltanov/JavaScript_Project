async function fetchProducts() {
    const productList = await fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching products:", error);
        return []; 
      });
  
    console.log("Fetched product list:", productList);
//   
    const productContainer = document.querySelector(".productContainer");
  
    productList.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";
  
      const img = document.createElement("img");
      img.src = product.image || "default.jpg";
      img.className = "card-img-top";
      img.alt = "Product Image";
      card.appendChild(img);
  
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
  
      const title = document.createElement("h5");
      title.className = "card-title text-center";
      title.innerText = product.title;
  
      const text = document.createElement("p");
      text.className = "card-text text-center";
      text.innerText = `Qiymət: ${product.price}₼`;
  
      const button = document.createElement("a");
      button.href = "#";
      button.className = "btn btn-primary shop_btn";
      button.innerText = "Shop";
  
      cardBody.appendChild(title);
      cardBody.appendChild(text);
      cardBody.appendChild(button);
      card.appendChild(cardBody);
  
      productContainer.appendChild(card);
    });
  }
  
  fetchProducts();
  