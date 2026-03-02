let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");

searchBtn.addEventListener("click", () => {
  let countryName = countryInput.value.trim();

  if (!countryName) return;

  searchCountry(countryName);

  countryInput.value = "";
});

countryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let countryName = countryInput.value.trim();

    if (!countryName) return;

    searchCountry(countryName);

    countryInput.value = "";
  }
});

async function searchCountry(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(url);
  const data = await response.json();
}
