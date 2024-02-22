let browseInput = document.getElementById('browseInput');
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
let paginationContent = document.getElementById('paginationContent');


let browseSearchedMovie = [];
let browseSearchedMovieData = [];
let PageNo = 0;
/*
let singleBrowseContainer = document.getElementById('singleBrowseContainer');
*/

searchBtn.addEventListener('click', () => {
    getFilteredMovies();
});

function showFilteredMovies() {
    let html = '';
    if (browseSearchedMovieData.movie_count === 0) {
        html = `<div class="h2 text-center py-3">NOT Found</div>`
        BrowseErrorMessage.innerHTML = html;
        browseFullPage.style.display = 'none';
    } else {

        browseFullPage.style.display = 'block';
        for (let i = 0; i < browseSearchedMovie.length; i++) {
            html += `
        <div class="col-lg-3 col-md-4 col-sm-6" >
                <div>
                    <div class="position-relative browse-hov-img">
                        <img src="https://www1.yts.nz` + browseSearchedMovie[i].medium_cover_image + `" class="card-img-top border border-5 border-accents rounded-1 w-100" onerror="this.src='assets/img/poster.jpg'">
                        <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-trans-black opacity-0 browse-hover">
                            <div class="d-flex h-100 justify-content-center align-items-center">
                                <div class="text-center">
                                    <div class="fs-4 fw-light">
                                        <span class="text-accents"><i class="las la-star text-light text-accents"></i></span><br>
                                        ` + browseSearchedMovie[i].rating + `
                                    </div>
                                    <div class="fs-4 fw-light py-2">
                                        <div class="">` + browseSearchedMovie[i].genres[0] + `</div>
                                        <div class="">` + browseSearchedMovie[i].genres[1] + `</div>
                                    </div>
                                    <a href="movie.html?movie_id=` + browseSearchedMovie[i].id + `" class="btn btn-theme mt-2" target="_blank">View Now</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <a href="movie.html?movie_id=` + browseSearchedMovie[i].id + `" class="card-title h5 text-decoration-none" target="_blank">` + browseSearchedMovie[i].title_english.substring(0, 40) + `...</a>
                        <p class="card-text">` + browseSearchedMovie[i].year + `</p>
                    </div>
                </div>
            </div>
        `
        }
        singleFilteredContainer.innerHTML = html;

    }

}

function goToPage(page){
    PageNo = page;
    getFilteredMovies();
}
function pagination(){
    let totalPage = Math.ceil(browseSearchedMovieData.movie_count / browseSearchedMovieData.limit);
    let currentPage = browseSearchedMovieData.page_number;

    let html = '';
    let pageLi = 1;
    if(currentPage >= 6){
        html += `<li class="page-item"><a onclick="goToPage(1)" class="page-link bg-dark text-light border-accents px-4 py-2">1</a></li>`;
        html += `<li class="page-item"><a onclick="goToPage(2)" class="page-link bg-dark text-light border-accents px-4 py-2">2</a></li>`;
        html += `<li class="page-item"><a class="page-link bg-dark text-light border-accents px-4 py-2">...</a></li>`;
    }
    if((currentPage - 3) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage - 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage - 3)+`</a></li>`;
    }
    if((currentPage - 2) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage - 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage - 2)+`</a></li>`;
    }
    if((currentPage - 1) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage - 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage - 1)+`</a></li>`;
    }
    html += `<li class="page-item"><a onclick="goToPage(`+currentPage+`)" class="page-link bg-success text-dark border-accents px-4 py-2">`+currentPage+`</a></li>`;
    if((currentPage + 1) <= totalPage){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage + 1)+`</a></li>`;
    }
    if((currentPage + 2) <= totalPage){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage + 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage + 2)+`</a></li>`;
    }
    if((currentPage + 3) <= totalPage){
        pageLi++;
        html += `<li class="page-item"><a onclick="goToPage(`+(currentPage + 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+(currentPage + 3)+`</a></li>`;
    }
    let reqPageStart = currentPage + 4;
    let reqPage = reqPageStart + (7 - pageLi);
    for (let i = reqPageStart; i <reqPage; i++){
        html += `<li class="page-item"><a onclick="goToPage(`+i+`)" class="page-link bg-dark text-light border-accents px-4 py-2">`+i+`</a></li>`;
    }


    console.log(pageLi)
    paginationContent.innerHTML = html;
}
function getFilteredMovies() {
    let query = browseInput.value.toLowerCase();
    let qualityVal = quality.value;
    let genreVal = genre.value;
    let yearVal = year.value;
    let orderByVal = orderBy.value;
    let ratingsVal = ratings.value;
    fetch('http://moviein.test/api/list_movies.php?page=' + PageNo + '&order_by=' + orderByVal + '&minimum_rating=' + ratingsVal + '&year=' + yearVal + '&quality=' + qualityVal + '&genre=' + genreVal + '&query_term=' + query).then(res => {
        if (!res.ok) {
            throw Error;
        }
        console.log(res)
        return res.json();
    }).then(data => {
        console.log(data)
        browseSearchedMovie = data.data.movies;
        browseSearchedMovieData = data.data;
        showFilteredMovies()
        pagination()
    })
}

ratings.addEventListener('change', () => {
    let ratingsVal = ratings.value;
    ratingShow.innerHTML = ratingsVal;
})


window.onload = function () {
    const searchParams = new URLSearchParams(window.location.search);
    PageNo = searchParams.get('page') == null ? 1 : searchParams.get('page');
    getFilteredMovies();
}