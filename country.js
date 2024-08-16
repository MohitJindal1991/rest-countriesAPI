const countryName=new URLSearchParams(window.location.search).get('name');
const flagImage=document.querySelector('.country-details img');
const countryNameH1=document.querySelector('.country-details h1');
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const subRegion=document.querySelector('.sub-region');
const capital=document.querySelector('.capital');
const topLevelDomain=document.querySelector('.top-level-domain');
const currencies=document.querySelector('.currencies');
const languages=document.querySelector('.languages');
const borderCountries=document.querySelector('.border-countries');
const darkMode=document.querySelector('.dark-mode');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>{
    console.log(res);
    return res.json();
}).then(([country])=>{
    console.log(country);
    flagImage.src=country.flags.svg;
    countryNameH1.innerText=country.name.common;
    population.innerText=country.population.toLocaleString('en-In');
    region.innerText=country.region;
    topLevelDomain.innerText=country.tld.join(', ');

    if(country.capital){
        capital.innerText=country.capital?.[0];
    }

    if(country.subregion){
        subRegion.innerText=country.subregion;
    }
    else{
        subRegion.innerText=country.region;
    }
    if(country.name.nativeName){
        nativeName.innerHTML=Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeName.innerText=country.name.common;
    }

    if(country.currencies){
        // console.log(Object.values(country.currencies));
        currencies.innerText=Object.values(country.currencies)
        .map((currency)=>currency.name)
        .join(', ');
        // currencies=;
    }

    if(country.languages){
        languages.innerText=Object.values(country.languages).join(', ');
    }
    
    if(country.borders){
    country.borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
          console.log(borderCountry);
          const borderCountryTag = document.createElement("a");
          borderCountryTag.innerText = borderCountry.name.common;
          borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
          borderCountries.append(borderCountryTag);
        })
    })
    }
})

  darkMode.addEventListener("click", () => {
    toggleTheme();
  });

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




