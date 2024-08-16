const countriesContainer = document.querySelector(".countries-container");
const filterByRegion=document.querySelector('.filter-by-region');
const searchInput=document.querySelector('.search-container input');
const themeChanger=document.querySelector('.theme-changer');

let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data)=>{
  renderCountries(data)
  allCountriesData=data;
});


filterByRegion.addEventListener('change',(e)=>{
   fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
   .then((res)=>res.json())
   .then(renderCountries);
})

  function renderCountries(data){
    countriesContainer.innerHTML='';
    data.forEach((country)=>{
      const countryCard = document.createElement("a");
      countryCard.href=`/country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");
         const cardHTML = `
        <img src=${country.flags.svg} alt=${country.name.common} />
          <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString()}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
`;
      countryCard.innerHTML = cardHTML;

      countriesContainer.append(countryCard);
    })
  }

  searchInput.addEventListener('input',(e)=>{
    const filteredCountries=allCountriesData.filter((country)=>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase().trim())
  )
  renderCountries(filteredCountries);
  })


  themeChanger.addEventListener('click',()=>{
    toggleTheme();
  })

  function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }

  // Apply the theme based on saved preference
  function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
