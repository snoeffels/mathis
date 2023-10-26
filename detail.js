let product = null;

async function fetchProductById(id) {
    const response = await fetch('https://dummyjson.com/products/' + encodeURIComponent(id));
    const body = await response.json();
    product = body;
    renderProduct();
}

async function renderProduct() {
    const productContainer = document.getElementById('product');
    productContainer.innerHTML = '';
    productContainer.innerHTML += `
        <div class="col-md-3"></div>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-body detail-card">
                    <div class="detail-image-wrapper" style="background-image: url('${product.images[0]}')">
                    </div>
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Stock: ${product.description}</p>
                    <p class="card-text">Price: ${product.price}$</p>
                    <p class="card-text">Rating: ${product.rating}/5</p>
                    
                </div>
                <div class="card-footer d-flex">
                    <a href="${ q ? '..?q=' + q : '..' }" class="btn btn-primary">Back</a>
                    <a  class="btn btn-primary" style="margin-left: auto">Buy</a>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>
    `;
}

if (id) {
    fetchProductById(id);
}