function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

id = getQueryParam("id");
q = getQueryParam("q");