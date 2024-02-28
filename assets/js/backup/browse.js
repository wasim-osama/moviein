let browseMovieContainer = document.getElementById('browseMovieContainer'),
    singleBrowseContainer = document.getElementById('singleBrowseContainer'),
    browseMovie = [],
    browseMovieData = [],
    PageNo = 0;


function showBrowseMovies(){
    let HTML = '';

    for(let i = 0; i < browseMovie.length; i++){
        let genre = '';
        for (let g = 0; g < browseMovie[i].genres.length; g++){
            if(g < 2){
                genre +=`
                    <div style="line-height:10px;" >`+browseMovie[i].genres[g]+`</div><br>
            `
            }
        }
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
                                        `+genre+`
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
    singleBrowseContainer.innerHTML = HTML;

}

function getBrowseMovie(){
    fetch(window.api_url+'/api/list_movies.php').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        browseMovie = res.data.movies;
        browseMovieData = res.data;
        console.log(res);
        showBrowseMovies();
        pagination();
    })
}
function pagination(){
    let paginationCount = browseMovieData.movie_count / browseMovieData.limit;
    let currentPage = browseMovieData.page_number;
    let skip =  browseMovieData.limit * (currentPage - 1);
    let paginationUrl = window.api_url+'/api/list_movies.php?skip='+skip;
    let paginationContent = document.getElementById('paginationContent');
    let html = ''
    for(let p= 1; p < Math.min(paginationCount,8); p++){
            html += `
            <li class="page-item">
                <a onclick="" class="page-link bg-dark text-light border-accents px-4 py-2">
                    `+p+`
                </a>
            </li>
            `;
    }
    paginationContent.innerHTML = html;
}
function currentPageClick(){

}


window.onload = function(){
    const searchParams = new URLSearchParams(window.location.search);
    PageNo = searchParams.get('page') == null ? 1 : searchParams.get('page');
    getBrowseMovie();
}
