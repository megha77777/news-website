const API_KEY = "ffa540c1c6c74e0b89992c60d585a546"
const url = "https://newsapi.org/v2/everything?q="
async function fetchData(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
    // console.log(`${url}${query}&apikey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("all").then(data => renderMain(data.articles))

// menu btn
let mobilemenu = document.querySelector(".mobile")
let menubtn = document.querySelector(".menu-btn")
menubtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden")
})

// render news
function renderMain(arr) {
    let mainHTML = ""
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += `
            <div class="card">
            <a href=${arr[i].url}>
            <img src=${arr[i].urlToImage} lazy="loading">
            <h4>${arr[i].title}</h4>
            <div class="publishbyDate">
            <p>${arr[i].source.name}</p>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
            </div>
            <div class="desc">
            ${arr[i].description}
            </div>
            </a>
            </div>
            `
        }
    }
    document.querySelector("main").innerHTML = mainHTML
}

const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInput = document.getElementById("searchInput")
const searchInputMobile = document.getElementById("searchInputMobile")

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    // console.log(data)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)

})

async function Search(query) {
    const data = await fetchData(query)
    renderMain(data.articles)
}