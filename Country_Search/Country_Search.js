let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
let spinnerEl = document.getElementById("spinner");

let input = "";
let countriesList = [];

function createAndAppendResult(element) {
    let countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card", "col-12", "col-md-5", "mr-md-5");
    resultCountriesEl.appendChild(countryCardEl);

    let flexEl = document.createElement("div");
    flexEl.classList.add("d-flex", "flex-row");
    countryCardEl.appendChild(flexEl);

    let flagEl = document.createElement("img");
    flagEl.src = element.flag;
    flagEl.classList.add("country-flag");
    flexEl.appendChild(flagEl);

    let textEl = document.createElement("div");
    flexEl.appendChild(textEl);

    let titleEl = document.createElement("h");
    titleEl.classList.add("country-name");
    titleEl.textContent = element.name;
    textEl.appendChild(titleEl);

    let populationEl = document.createElement("p");
    populationEl.classList.add("country-population");
    populationEl.textContent = element.population;
    textEl.appendChild(populationEl);

};

function displayResults() {
    spinnerEl.classList.toggle("d-none");
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.includes(input)) {
            createAndAppendResult(country);
        }
    }
}

function getCountries() {
    spinnerEl.classList.toggle("d-none");
    resultCountriesEl.textContent = "";
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            countriesList = jsonData;
            displayResults()
        });
}

function fetchResults(event) {
    // spinnerEl.classList.toggle("d-none");
    input = event.target.value;
    getCountries();
}

getCountries();
searchInputEl.addEventListener("keydown", fetchResults);