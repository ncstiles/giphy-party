const apiKey = 'K9W2etAlZq3BmfxEZDbZwtCMX6JRVd7H';
const limit = 9;
const rating = 'g';
const trending = `http://api.giphy.com/v1/gifs/trending?limit=${limit}&rating=${rating}&`;
const search = `http://api.giphy.com/v1/gifs/search?limit=${limit}&rating=${rating}&`;
const gifDiv = document.getElementById('gifDiv');
const searchInput = document.getElementById('searchInput');
let pg = 0;
let searchTerm = '';

async function getResults(url) {
    const res = await fetch(url);
    const result = await res.json();
    return result['data']; // returns an arr of gif objects
}

window.onload = () => {
    gifDiv.innerHTML = '';
    displayTrendingGifs();
}

document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    searchTerm = document.getElementById('searchInput').value;
    console.log('searchedText', searchTerm);
    displaySearchedGifs();
    pg = 0;
    gifDiv.innerHTML = '';
    document.getElementById('showBtn').classList.remove('hidden');
});

searchInput.addEventListener('input', () => {
    if (!searchInput.value) {
        pg = 0;
        gifDiv.innerHTML = '';
        document.getElementById('showBtn').classList.add('hidden');
        displayTrendingGifs();
    }
})

async function displayGifs(url) {
    console.log('displaying gifs')
    let gifObjs = await getResults(url);
    gifObjs.forEach((gifObj) => {
        let imgUrl = gifObj.images.fixed_height.url;
        gifDiv.innerHTML += `<img src=${imgUrl}></img>`;
    });
    console.log('gifDiv', gifDiv.innerHTML);
    pg += 1;
};

async function displayTrendingGifs() {
    const url = trending + `apiKey=${apiKey}&offset=${pg*limit}`;
    await displayGifs(url);
}

async function displaySearchedGifs() {
    console.log('pAgE num:', pg);
    const url = search + `apiKey=${apiKey}&q=${searchTerm}&offset=${pg*limit}`;
    await displayGifs(url);
}

function showMore() {
    displaySearchedGifs();
}




