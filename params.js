function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const id = getQueryParam("id");
const q = getQueryParam("q");