let search = q || '';

function renderProducts(products) {
    productsContainer = document.querySelector('#products');
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12 text-center" style="margin-top: 85px">
                <h3>No matching products found</h3>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <div class="card-body item-body">
                        <div class="item-image-wrapper bg-contain bg-center-x" style="background-image: url('${product.images[0]}');">
                        </div>
                        <div class="item-title d-flex">
                            <h5>${product.title}</h5>
                            <span style="margin-left: auto">${product.price}€</p>
                        </div>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <div class="card-footer">
                        <a href="/detail.html?id=${product.id}${search ? '&q=' + search : ''}" class="btn btn-primary">Show</a>
                    </div>
                </div>
            </div>
        `;
    });
}

async function fetchProducts(s, callback) {
    const response = await fetch('https://dummyjson.com/products/search?q=' + encodeURIComponent(s));
    const body = await response.json();

    if (callback) {
        callback(body.products);
    }
}

function handleSearchInput(e) {
    search = e.target.value;
    fetchProducts(search, renderProducts);
}

fetchProducts(search, renderProducts);

document.addEventListener("DOMContentLoaded", () => document.querySelector('#search').value = search);