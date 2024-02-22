let browseMovieContainer = document.getElementById('browseMovieContainer'),
    singleBrowseContainer = document.getElementById('singleBrowseContainer'),
    browseMovie = [];


function showBrowseMovies(){
    let HTML = '';
    for(let i = 0; i < browseMovie.length; i++){
        HTML += `
            <div class="col-lg-3 col-md-4 col-sm-6" >
                <div>
                    <div class="position-relative browse-hov-img">
                        <img src="https://www1.yts.nz`+browseMovie[i].medium_cover_image+`" class="card-img-top border border-5 border-accents rounded-1 w-100" onerror="this.src='assets/img/poster.jpg'">
                        <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-trans-black opacity-0 browse-hover">
                            <div class="d-flex h-100 justify-content-center align-items-center">
                                <div class="text-center">
                                    <div class="fs-4 fw-light">
                                        <span class="text-accents"><i class="las la-star text-light text-accents"></i></span><br>
                                        `+browseMovie[i].rating+`
                                    </div>
                                    <div class="fs-4 fw-light py-2">
                                        <div class="">`+browseMovie[i].genres[0]+`</div>
                                        <div class="">`+browseMovie[i].genres[1]+`</div>
                                    </div>
                                    <a href="movie.html?movie_id=`+browseMovie[i].id+`" class="btn btn-theme mt-2" target="_blank">View Now</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <a href="movie.html?movie_id=`+browseMovie[i].id+`" class="card-title h5 text-decoration-none" target="_blank">`+browseMovie[i].title_english.substring(0,40)+`...</a>
                        <p class="card-text">`+browseMovie[i].year+`</p>
                    </div>
                </div>
            </div>
        `
    }
    console.log(singleBrowseContainer);
    singleBrowseContainer.innerHTML = HTML;
}

function getBrowseMovie(){
    fetch('http://moviein.test/api/list_movies.php').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        browseMovie = res.data.movies;
        console.log(browseMovie);
        showBrowseMovies();
    })
}


window.onload = function(){
    getBrowseMovie();
}
