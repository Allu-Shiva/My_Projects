let searchEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let loadingEl = document.getElementById("spinner");

function createAndAppendResults(result) {
    let obj = result;
    let divEl = document.createElement("div");
    divEl.classList.add("result-item");

    searchResultsEl.appendChild(divEl);

    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = obj.link;
    titleEl.textContent = obj.title;
    divEl.appendChild(titleEl);

    let breakEle1 = document.createElement("br");
    divEl.appendChild(breakEle1);

    let linkEl = document.createElement("a");
    linkEl.classList.add("result-url");
    linkEl.href = obj.link;
    linkEl.textContent = obj.link;
    divEl.appendChild(linkEl);

    let breakEle2 = document.createElement("br");
    divEl.appendChild(breakEle2);

    let linkDiscription = document.createElement("p");
    linkDiscription.classList.add("link-description");
    linkDiscription.textContent = obj.description;
    divEl.appendChild(linkDiscription);
}

function fetchContent(searchVal) {
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchVal;
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            loadingEl.classList.toggle("d-none");
            let resultInArray = jsonData.search_results;
            searchResultsEl.textContent = "";
            for (let element of resultInArray) {
                createAndAppendResults(element);
            }
        })
}


function getUserInput(event) {
    let searchVal = searchEl.value;
    // fetchContent(searchVal)
    if (event.key == "Enter") {
        loadingEl.classList.toggle("d-none");
        fetchContent(searchVal);
    }
}

searchEl.addEventListener("keydown", getUserInput);