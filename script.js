let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");
let loadingSpinner = document.getElementById("loading-spinner");

loadingSpinner.classList.add("hidden");

searchBtn.addEventListener("click", () => {
  const countryName = countryInput.value.trim();

  if (!countryName) return;

  searchCountry(countryName);

  countryInput.value = "";
});

countryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const countryName = countryInput.value.trim();

    if (!countryName) return;

    searchCountry(countryName);

    countryInput.value = "";
  }
});

async function searchCountry(countryName) {
  try {
    loadingSpinner.classList.remove("hidden");

    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    const response = await fetch(url);
    const data = await response.json();

    // get the country then process its data
    const country = data[0];
    document.getElementById("country-info").innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
    `;

    // get bordering countries
    const borderingCountries = country.borders;
    searchBorders(borderingCountries);
  } catch (error) {
    const errorMsg = (document.getElementById("error-message").textContent =
      "Country not found.");
    document.getElementById("country-info").innerHTML = " ";

    c;
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

const borderingCountriesSec = document.getElementById("bordering-countries");

async function searchBorders(borderingCountries) {
  // for each bordering code, fetch that countries info
  for (const code of borderingCountries) {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );
    const data = await response.json();
    const country = data[0];
    let bCountry = document.createElement("section");
    bCountry.classList.add("country-card");
    bCountry.innerHTML = `
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital[0]}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
      `;
    borderingCountriesSec.appendChild(bCountry);
  }
}
