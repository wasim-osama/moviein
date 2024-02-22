let browseInput  =document.getElementById('browseInput');
let quality = document.getElementById('quality');
let genre = document.getElementById('genre');
let year = document.getElementById('year');
let orderBy = document.getElementById('orderBy');
let ratings = document.getElementById('ratings');
let ratingShow = document.getElementById('ratingShow');
let searchBtn = document.getElementById('searchBtn');
let singleFilteredContainer = document.getElementById('singleFilteredContainer');
let browseFullPage = document.getElementById('browseFullPage');
let BrowseErrorMessage = document.getElementById('BrowseErrorMessage');



let browseSearchedMovie  =[];
let browseSearchedMovieData  =[];
/*
let singleBrowseContainer = document.getElementById('singleBrowseContainer');
*/

searchBtn.addEventListener('click',() => {
    console.log('working');
    getFilteredMovies();
    singleBrowseContainer.style.display = 'none';
});

function showFilteredMovies(){
    let html  ='';
    if (browseSearchedMovieData.movie_count === 0){
        html = `<div class="h2 text-center py-3">NOT Found</div>`
        BrowseErrorMessage.innerHTML= html;
        browseFullPage.style.display = 'none';
    }else{

        browseFullPage.style.display = 'block';
        for(let i = 0; i < browseSearchedMovie.length; i++){
            html += `
        <div class="col-lg-3 col-md-4 col-sm-6" >
                <div>
                    <div class="position-relative browse-hov-img">
                        <img src="https://www1.yts.nz`+browseSearchedMovie[i].medium_cover_image+`" class="card-img-top border border-5 border-accents rounded-1 w-100" onerror="this.src='assets/img/poster.jpg'">
                        <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-trans-black opacity-0 browse-hover">
                            <div class="d-flex h-100 justify-content-center align-items-center">
                                <div class="text-center">
                                    <div class="fs-4 fw-light">
                                        <span class="text-accents"><i class="las la-star text-light text-accents"></i></span><br>
                                        `+browseSearchedMovie[i].rating+`
                                    </div>
                                    <div class="fs-4 fw-light py-2">
                                        <div class="">`+browseSearchedMovie[i].genres[0]+`</div>
                                        <div class="">`+browseSearchedMovie[i].genres[1]+`</div>
                                    </div>
                                    <a href="movie.html?movie_id=`+browseSearchedMovie[i].id+`" class="btn btn-theme mt-2" target="_blank">View Now</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <a href="movie.html?movie_id=`+browseSearchedMovie[i].id+`" class="card-title h5 text-decoration-none" target="_blank">`+browseSearchedMovie[i].title_english.substring(0,40)+`...</a>
                        <p class="card-text">`+browseSearchedMovie[i].year+`</p>
                    </div>
                </div>
            </div>
        `
        }
        singleFilteredContainer.innerHTML= html;

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
    fetch('http://moviein.test/api/list_movies.php?order_by='+orderByVal+'&minimum_rating='+ratingsVal+'&year='+yearVal+'&quality='+qualityVal+'&genre='+genreVal+'&query_term='+query).then(res => {
        if (!res.ok){
            throw Error;
        }
        console.log(res)
        return res.json();
    }).then( data => {
        console.log(data)
        browseSearchedMovie = data.data.movies;
        browseSearchedMovieData = data.data;
        showFilteredMovies()
    })
}

ratings.addEventListener('change', () => {
    let ratingsVal =ratings.value;
    ratingShow.innerHTML = ratingsVal;
})