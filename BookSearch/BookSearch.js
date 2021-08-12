let searchInputEl = document.getElementById("searchInput");
let displayCountEl = document.getElementById("selectDisplayCount");
let resultContainerEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

let rowEl = document.createElement("div");
rowEl.classList.add("row");
resultContainerEl.appendChild(rowEl);

let startSearch = function(event) {
    if (event.key === "Enter" || event.key == undefined) {
        rowEl.textContent = "";
        spinnerEl.classList.remove("d-none");
        let title = searchInputEl.value;
        let count = displayCountEl.value;
        let url = "https://apis.ccbp.in/book-store?" + "title=" + title + "&maxResults=" + count;
        // console.log(url);
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                httpResponse(jsonData);
            })
    }
};
displayCountEl.addEventListener("change", startSearch);
searchInputEl.addEventListener("keydown", startSearch);
// 12w4tga

function resultsNotFound() {
    rowEl.textContent = "";
    spinnerEl.classList.add("d-none");
    let headerEl = document.createElement("h1");
    headerEl.classList.add("header", "text-center", "m-auto");
    headerEl.textContent = "No Results Found";
    rowEl.appendChild(headerEl);
}


function httpResponse(jsonData) {
    console.log(jsonData);
    if (jsonData.search_results.length == 0) {
        resultsNotFound();
    } else {
        // resultContainerEl.removeChild(rowEl);
        rowEl.textContent = "";
        let headEl = document.createElement("h1");
        headEl.textContent = "Popular Books";
        headEl.classList.add("col-12", "header", "mt-3", "mb-3");
        rowEl.appendChild(headEl);

        resultContainerEl.appendChild(rowEl);

        spinnerEl.classList.add("d-none");
        let myArray = jsonData.search_results;
        for (let eachItem of myArray) {
            createAndAppend(eachItem);
        }
    }
};

function createAndAppend(eachItem) {

    let colEl = document.createElement("div");
    colEl.classList.add("col-5", "m-auto");
    rowEl.appendChild(colEl);

    let imgEl = document.createElement("img");
    imgEl.src = eachItem.imageLink;
    imgEl.classList.add("mt-3");
    colEl.appendChild(imgEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = eachItem.author;
    authorEl.classList.add("author");
    colEl.appendChild(authorEl);

}
// console.log(resultContainerEl);