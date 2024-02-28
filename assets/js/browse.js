
let browseInput = document.getElementById('browseInput'),
    quality = document.getElementById('quality'),
    genre = document.getElementById('genre'),
    year = document.getElementById('year'),
    orderBy = document.getElementById('orderBy'),
    ratings = document.getElementById('ratings'),
    searchBtn = document.getElementById('searchBtn'),
    filteredMovies = [],
    filteredMoviesData = [];

ratingShow = document.getElementById('ratingShow');


searchBtn.addEventListener('click', () => {
    getFilteredMoviesData();
})

function gotoPage(page){
    pageNo = page;
    getFilteredMoviesData();
}

function getFilteredMoviesData() {
    let qualityVal = quality.value,
        genreVal = genre.value,
        yearVal = year.value,
        orderByVal = orderBy.value,
        ratingsVal = ratings.value;
    fetch('http://moviein.test/api/list_movies.php?page='+pageNo+'&quality='+qualityVal+'&genre='+genreVal+'&year='+yearVal+'&order_by='+orderByVal+'&minimum_rating='+ratingsVal).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        console.log(res);
        filteredMovies = res.data.movies;
        filteredMoviesData = res.data;
        showFilteredMovies();
    })
}


function showMovies(Movies){
    fetch('/component/browse_movies.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movies : Movies});
        document.getElementById('browse_page').innerHTML = template;
    })
}

function getBrowseMovies(){
    fetch('http://moviein.test/api/list_movies.php?sort_by=year&minimum_rating=5').then(res =>{
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        const Movies = data.data.movies;
        showMovies(Movies)
        console.log(Movies)
    })
}

window.onload = () =>{
    const searchParam = new URLSearchParams(window.location.search);
    pageNo = searchParam.get('page') == null ? 1 :searchParam.get('page');
    getFilteredMoviesData();
    getBrowseMovies();
}