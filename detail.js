function renderProduct(product) {
    const productContainer = document.getElementById('product');

    if(product?.message) {
        productContainer.innerHTML = `
            <div class="col-12 text-center" style="margin-top: 85px">
                <h3>${product.message}</h3>
            </div>
        `;
        return;
    }

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
                    <p class="card-text">Stock: ${product.stock} left</p>
                    <p class="card-text">Price: ${product.price}$</p>
                    <p class="card-text">Rating: ${product.rating}/5</p>
                    
                </div>
                <div class="card-footer d-flex">
                    <a href="${ q ? '..?q=' + q : '..' }" class="btn btn-primary">Back</a>
                    <a  class="btn btn-primary" style="margin-left: auto">Buy</a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-3 recommendations">
            <div class="row recommendations"></div>
        </div>
    `;
}

function renderRecommendations(products) {
    const recommendationsContainer = document.getElementsByClassName('recommendations')[0];

    recommendationsContainer.innerHTML = '';
    products.slice(0, 3).forEach(product => {
        recommendationsContainer.innerHTML += `
        <div class="col-12" style="margin-bottom: 15px">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    
                </div>
                <div class="card-footer d-flex">
                    <a href="/detail.html?id=${product.id}${q ? '&q=' + q : ''}" class="btn btn-primary">Show</a>
                </div>
            </div>
        </div>
    `;
    });
}

async function fetchProductById(id, callback) {
    const response = await fetch('https://dummyjson.com/products/' + encodeURIComponent(id));
    const body = await response.json();

    if (callback) {
        callback(body);
    }

    return body;
}

async function fetchProductsByCategory(category, callback) {
    const response = await fetch('https://dummyjson.com/products/category/' + encodeURIComponent(category));
    const body = await response.json();

    if (callback) {
        callback(body.products);
    }
}


async function init() {
    if (id) {
        const category = (await fetchProductById(id, renderProduct))?.category;
        console.log(category);
    
        if (category) {
            fetchProductsByCategory(category, renderRecommendations);
        }
    }
}

init();