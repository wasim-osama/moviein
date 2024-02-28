let Movie = null;
const searchParams = new URLSearchParams(window.location.search);
const movie_id = searchParams.get('movie_id');
let movieContainer = document.getElementById('movieContainer');
let relatedMovie = [];
let relatedMovieContainer = document.getElementById('relatedMovieContainer');


Fancybox.bind('[data-fancybox="gallery"]', {
    // Your custom options for a specific gallery
});

function showSingleMovie(){
    let castHtml = '';
    let genre = '';
    for (let g = 0 ; g < Movie.genres.length; g++){
        genre += `
            <span class="badge bg-accents text-black-50 me-1">`+Movie.genres[g]+`</span>
        `
    }

    let downloadTorBtn = '';
    for (let d = 0; d < Movie.torrents.length; d++ ){

        downloadTorBtn += `
            <a href="https://www1.yts.nz`+Movie.torrents[d].url+`" class="btn btn-theme me-2 download-btn" target="_blank"><i class="las la-magnet"></i> Download &nbsp;`+Movie.torrents[d].quality+` <small></small></a>
        `

    }

    for (let c = 0 ; c < Movie.cast.length; c++){

        if (c < 4){
            castHtml +=`
            <div class="col-sm-3 col-6 py-2">
                <div class="d-flex flex-column align-items-center text-light">
                    <div class="h6 text-center fw-light">`+Movie.cast[c].character_name.substring(0,9)+`..</div>
                    <img src="https://www1.yts.nz/`+Movie.cast[c].url_small_image+`" onerror="this.src='assets/img/poster.jpg';" class="rounded-circle" style="height: 60px; width: 60px;">
                    <div class="h5 text-center">`+Movie.cast[c].name+`</div>
                </div>  
            </div>
        `;
        }
    }
    let HTML = `
          <div class="bg-img w-100 h-100 position-relative" style="background-image: url('https://www1.yts.nz/` + Movie.background_image_original + `')"  onerror="this.src'assets/img/poster.jpg';">
          <div class="bg-overlay position-absolute w-100 h-100 bg-secondary top-0 start-0 opacity-50 z-0"></div>
            <div class="container-lg py-5 position-relative z-1">
                <div class="row">
                    <div class="col-md-4">
                        <img class="w-100 shadow-sm rounded-3" src="https://www1.yts.nz/` + Movie.large_cover_image + `" alt="" onerror="this.src'assets/img/poster.jpg';">
                    </div>
                    <div class="col-lg-6 offset-lg-2 col-md-8">
                        <div class="h1">` + Movie.title_long + `</div>
                        <p class="fw-light">` + Movie.description_intro.substring(0, 150) + `&nbsp;<a href="#" class="text-light fw-normal" id="readMore">Read more</a></p>
                        <div class="py-2">`+genre+`</div>
                        <div class="fs-4 text-center fw-bold text-accents">Top Casts:
                            <div class="row">
                                ` + castHtml + `
                            </div>
                        </div>
                        <div class="fs-4 font-light pb-2 text-accents fw-bold">
                         Ratings
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="btn-theme d-inline-block fs-3 p-4 rounded-end-pill"> 
                                <span class="text-accents fw-bold fw-bold fs-3">
                                    <i class="las la-star"></i>
                                </span>
                                `+ Movie.rating +`/10
                            </div>  
                            <div class="fs-4 bg-background fs-3 p-4 rounded-start-pill">
                                Release Year : `+Movie.year+`
                            </div>
                        </div>
                        <div class="d-flex pt-5 justify-content-center">`+downloadTorBtn+`</div>
                    </div>  
                </div>
            </div>
        </div>  
        <div class="w-100 py-4">
            <div class="container">
            <div class="h3 fw-bold fst-italic mb-3  border-start border-4 border-accents">&nbsp;Quality Check</div>
                <div class="row">
                    <div class="col-md-4">
                        <img src="https://www1.yts.nz/`+Movie.large_screenshot_image1+`" alt="" data-fancybox="gallery" class="w-100 border-2 border-gray border rounded-1">
                    </div>
                    <div class="col-md-4">
                        <img src="https://www1.yts.nz/`+Movie.large_screenshot_image2+`" alt="" data-fancybox="gallery" class="w-100 border-2 border-gray border rounded-1">
                    </div>
                    <div class="col-md-4">
                        <img src="https://www1.yts.nz/`+Movie.large_screenshot_image3+`" alt="" data-fancybox="gallery" class="w-100 border-2 border-gray border rounded-1">
                    </div>
                </div>                
            </div>
        </div>
    `;

    movieContainer.innerHTML= HTML;
}
function showRelatedMovies(){
    RMhtml = '';
    for (i = 0; i < relatedMovie.length; i++){
        RMhtml += `
          <div class="col-sm-6 col-md-3">
            <div class="card bg-dark text-white">
            <img src="https://www1.yts.nz/`+relatedMovie[i].medium_cover_image+`"  class="card-img"  onerror="this.src='assets/img/poster.jpg';" style="height: 456px">
            <div class="custom-overlay py-3 bg-secondary-cus">
                <h5 class="card-title">`+relatedMovie[i].title_english.substring(0,15)+`...</h5>
                <p class="card-text fs-6"><i class="las la-star text-accents"></i>`+relatedMovie[i].rating+`/10</p>
                <p class="card-text fs-6">`+relatedMovie[i].year+`</p>
                <a href="movie.html?movie_id=`+ relatedMovie[i].id +`" class="btn btn-theme" target="_blank">View</a>
            </div>
          </div>
          </div>  
          
        `;
    }
    relatedMovieContainer.innerHTML = RMhtml;
}
function  getSingleMovie(){
    fetch(window.api_url+'/api/movie_details.php?movie_id='+movie_id+'&with_images=true&with_cast=true').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    } ).then(res => {
        Movie = res.data.movie;
        console.log(Movie);
        showSingleMovie();
    })
}
function  getSuggestMovie(){
    fetch(window.api_url+'/api/movie_suggestions.php?movie_id='+movie_id).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    } ).then(res => {
        relatedMovie = res.data.movies;
        console.log(res);
        showRelatedMovies();
    })
}

window.onload = function (){

    getSingleMovie();
    getSuggestMovie();

}
