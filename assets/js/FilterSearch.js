let browseInput  =document.getElementById('browseInput');
let quality = document.getElementById('quality');
let genre = document.getElementById('genre');
let year = document.getElementById('year');
let orderBy = document.getElementById('orderBy');
let ratings = document.getElementById('ratings');
let searchBtn = document.getElementById('searchBtn');
let FilteredMovies = document.getElementById('FilteredMovies');

let browseSearchedMovie  =[];
/*
let singleBrowseContainer = document.getElementById('singleBrowseContainer');
*/

searchBtn.addEventListener('click',() => {
    console.log('working');
    getFilteredMovies();
})

function showFilteredMovies(){
    let html  ='';
    for(let i = 0; i < browseSearchedMovie.length; i++){

    }
}
function getFilteredMovies(){
    let query = browseInput.value.toLowerCase();
    let qualityVal = quality.value;
    let genreVal = genre.value;
    console.log(genreVal);
    let yearVal = year.value;
    let orderByVal =orderBy.value;
    let ratingsVal =ratings.value;
    fetch('http://moviein.test/api/list_movies.php?sort_by=rating&order_by='+orderByVal+'&rating='+ratingsVal+'&year='+yearVal+'&quality='+qualityVal+'&genre='+genreVal+'&query_term='+query).then(res => {
        if (!res.ok){
            throw Error;
        }
        console.log(res)
        return res.json();
    }).then( data => {
        console.log(data)
        browseSearchedMovie = data.data.movies;
    })
}
