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
        <div class="col-lg-3"></div>
        <div class="col-12 col-lg-6" style="margin-bottom: 15px">
            <div class="card">
                <div class="card-body detail-card">
                    <div class="detail-image-wrapper" style="background-image: url('${product.images[0]}')">
                    </div>
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex" style="align-items: flex-end">
                        <p class="card-text" style="font-size: 25px; margin-bottom: 0px">${usdToDogeCoin(product.price)}</p>
                        <img style="width: 25px; position:relative;bottom: 7px;left: 3px" src="/coin.png">
                        <span style="margin-left: auto">${product.rating}/5</span>
                    </div>
                    
                </div>
                <div class="card-footer d-flex">
                    <a href="${ q ? '..?q=' + q : '..' }" class="btn btn-primary">Back</a>
                    <div style="margin-left: auto">
                        <span style="margin-right:15px">Only ${product.stock} left!</span>
                        <a class="btn btn-primary" title="Not implemented!" >Buy</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-3 recommendations">
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
                <div class="item-title d-flex">
                    <h5>${product.title}</h5>
                    <span style="margin-left: auto">${usdToDogeCoin(product.price)}</span>
                    <img style="width: 15px; height:15px; position:relative;top: 3px;left: 3px" src="/coin.png">
                </div>
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
    console.log(id);
    if (id) {
        const product = (await fetchProductById(id, renderProduct));
    
        if (product?.category) {
            fetchProductsByCategory(product.category, renderRecommendations);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    document.querySelector('#search').value = q
});