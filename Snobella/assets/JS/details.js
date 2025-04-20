// detail.js
document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
  });
  
  async function initProductDetail() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return console.error('Product ID is missing');
  
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) throw new Error('Məhsul tapılmadı');
      const product = await response.json();
  

      const mainImg       = document.querySelector('.product-img');
      const thumbContainer= document.querySelector('.col-md-1 .d-flex.flex-column');
      const titleEl       = document.querySelector('h4 strong');
      const reviewEl      = document.querySelector('p.mb-1');
      const pricingRow    = document.querySelector('.row.g-2');
      const sizeGroup     = document.querySelector('.btn-group');
      const colorContainer= document.querySelector('.color-options');
      const addCartBtn    = document.querySelector('.btn-danger.flex-grow-1');
      const cashBtn       = document.querySelector('.btn-outline-dark');
      const whatsappLink  = document.querySelector('a[href="#"]');
  

      mainImg.src = product.image_url || product.image;
      mainImg.alt = product.name;
      thumbContainer.innerHTML = '';
      (product.images || [product.image_url || product.image]).forEach(src => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'img-thumbnail';
        thumb.style.cursor = 'pointer';
        thumb.alt = product.name;
        thumb.addEventListener('click', () => mainImg.src = src);
        thumbContainer.appendChild(thumb);
      });
  

      titleEl.textContent = product.name;
  
      const rating = product.rating || 0;
      const count  = product.reviewCount || 0;
      reviewEl.innerHTML = '⭐️'.repeat(Math.round(rating)) +
        ` <span class="text-muted">${rating.toFixed(1)} | ${count} reviews</span>`;
  

      pricingRow.innerHTML = '';
      (product.pricing || []).forEach(tier => {
        const col    = document.createElement('div');
        const btn    = document.createElement('button');
        col.className = tier.range.includes('50') ? 'col-12' : 'col-6';
        btn.type      = 'button';
        btn.className = tier.highlight
                         ? 'btn btn-outline-danger'
                         : 'btn btn-outline-secondary';
        btn.innerHTML = `${tier.range}<br><strong>US $${tier.price.toFixed(2)}</strong>`;
        col.appendChild(btn);
        pricingRow.appendChild(col);
      });
  
   
      sizeGroup.innerHTML = '';
      (product.sizes || []).forEach((size, idx) => {
        const input = document.createElement('input');
        const label = document.createElement('label');
        input.type      = 'radio';
        input.className = 'btn-check';
        input.name      = 'size';
        input.id        = `size${size}`;
        if (idx === 0) input.checked = true;
        label.className = 'btn btn-outline-dark';
        label.htmlFor   = input.id;
        label.textContent = size;
        sizeGroup.append(input, label);
      });
  
     
      colorContainer.innerHTML = '<h6>Color</h6>';
      (product.colors || []).forEach((color, idx) => {
        const span = document.createElement('span');
        span.className = `color-dot color-${color}` + (idx === 0 ? ' active' : '');
        span.dataset.color = color;
        span.addEventListener('click', () => {
          document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
          span.classList.add('active');
        });
        colorContainer.appendChild(span);
      });
  
  
      addCartBtn.addEventListener('click', () => {
        console.log('Cart-a əlavə et, məhsul ID:', id);
      
      });
      cashBtn.addEventListener('click', () => {
        console.log('Nəğd ödəniş, məhsul ID:', id);
       
      });
      whatsappLink.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = `https://wa.me/?text=I want to order product ID ${id}`;
      });
  
    } catch (err) {
      console.error('Xəta:', err);
    }
  }
  