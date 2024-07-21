console.log("wear");

const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
searchBtn.onclick = async () => {
  const data = await (await (fetch(`/get-weather-data.php?query=${searchInput.value}`))).json()
  console.log(data)
}

