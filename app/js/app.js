const weatherForm = document.getElementById("weather-form");
const searchInput = document.getElementById("search-input");
const weatherWrapper = document.getElementById("weather-wrapper");
const weatherDesc = document.getElementById("weather-desc");
const weatherTemp = document.getElementById("weather-temp");
const weatherTempFL = document.getElementById("weather-temp-fl");
const weatherImg = document.getElementById("weather-img");
const errorAlert = document.getElementById("error-alert");
const loadingIndicator = document.getElementById("loading-indicator");
const historyTable = document.getElementById("history-table");
const historyTitle = document.getElementById("history-title");
weatherForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!e.currentTarget.checkValidity()) {
    return;
  }
  errorAlert.classList.add("scale-0", "max-h-0", "opacity-0")
  weatherWrapper.classList.add("scale-0", "max-h-0", "opacity-0")
  loadingIndicator.classList.remove("scale-0", "max-h-0", "opacity-0")
  const dataRes = await (fetch(`/get-weather-data.php?query=${searchInput.value.toLowerCase()}`));
  loadingIndicator.classList.add("scale-0", "max-h-0", "opacity-0")
  if (dataRes.status === 404) {
    weatherWrapper.classList.add("scale-0", "max-h-0", "opacity-0")
    errorAlert.classList.remove("scale-0", "max-h-0", "opacity-0")
    return;
  }
  const data = await dataRes.json();
  errorAlert.classList.add("scale-0", "max-h-0", "opacity-0")
  weatherWrapper.classList.remove("scale-0", "max-h-0", "opacity-0")
  weatherDesc.innerText = data.weather[0].description;
  weatherTemp.innerText = `Temperature: ${data.main.temp}°C`;
  weatherTempFL.innerText = `Feels Like: ${data.main.feels_like}°C`;
  weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const history = await (await (fetch(`/get-weather-history.php?query=${searchInput.value.toLowerCase()}`))).json();
  historyTable.innerHTML = "";
  historyTitle.innerText = `History for ${searchInput.value}`
  history.forEach(element => {
    historyTable.innerHTML += `<tr>
<td>${element.temp}°C</td>
<td class="capitalize">${element.description}</td>
<td>${new Date(element.time * 1000).toString()}
</td>
</tr>`
  });
}


