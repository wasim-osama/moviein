let browseInput = document.getElementById('browseInput'),
    quality = document.getElementById('quality'),
    genre = document.getElementById('genre'),
    year = document.getElementById('year'),
    orderBy = document.getElementById('orderBy'),
    ratings = document.getElementById('ratings'),
    searchBtn = document.getElementById('searchBtn'),
    singleBrowseContainer = document.getElementById('singleBrowseContainer'),
    paginationContent = document.getElementById('paginationContent'),
    pageNo = 0,
    filteredMovies = [],
    filteredMoviesData = [];

    ratingShow = document.getElementById('ratingShow');


searchBtn.addEventListener('click', () => {
    getFilteredMoviesData();
})

function pagination(){
    let totalPage = Math.ceil(filteredMoviesData.movie_count / filteredMoviesData.limit);
    let currentPage = filteredMoviesData.page_number;


    let html = '';
    let pageLi = 1;
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">< Previous</a></li>`;

    if (currentPage >= 6){
        html += `<li class="page-item"><a onclick="gotoPage(1)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+1+`</a></li>`;
        html += `<li class="page-item"><a onclick="gotoPage(2)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+2+`</a></li>`;
        html += `<li class="page-item"><a  class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">..</a></li>`;
    }
    if ((currentPage - 3) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+(currentPage - 3)+`</a></li>`;
    }
    if ((currentPage - 2) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage - 2)+`</a></li>`;
    }
    if ((currentPage - 1) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage - 1)+`</a></li>`;
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+ currentPage +`)" class="page-link text-light border-accents px-4 py-2 bg-success" role="button">`+currentPage+`</a></li>`;
    if (currentPage < (totalPage - 3)){
        if ((currentPage + 1) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage + 1)+`</a></li>`;
        }
        if ((currentPage + 2) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage + 2)+`</a></li>`;
        }
        if ((currentPage + 3) <= totalPage) {
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">` + (currentPage + 3) + `</a></li>`;
        }
    }

    let reqPageStart = currentPage + 4;
    let reqPage = reqPageStart + (7 - pageLi);
    for (let i = reqPageStart; i < reqPage; i++){
        html += `<li class="page-item"><a onclick="gotoPage(+i+)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">` +i+ `</a></li>`;
    }
    if (currentPage < totalPage){
        if (currentPage <= totalPage){
            html += `<li class="page-item"><a class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">..</a></li>`;
            html += `<li class="page-item"><a onclick="gotoPage(`+totalPage+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+totalPage+`</a></li>`;
        }
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">next ></a></li>`;
    paginationContent.innerHTML = html;
    console.log(pageLi);

}
function gotoPage(page){
    pageNo = page;
    getFilteredMoviesData();
}

function getTitle(filteredMovies){
    return filteredMovies.title_english.length > 20 ? filteredMovies.title_english +'...' :  filteredMovies.title_english;
}

function showFilteredMovies(){
    let html = '';
    for (let i = 0; i < filteredMovies.length; i++){
        let genre = '';
        for (let g = 0; g < filteredMovies[i].genres.length; g++){
            if (g < 2){
                genre += `
                <div style="line-height: 10px">` + filteredMovies[i].genres[g] + `</div><br>
            `
            }
        }
        html += `
            <div class="col-lg-3 col-md-4 col-sm-6" >
                    <div class="position-relative browse-hov-img">
                        <img src="https://www1.yts.nz` + filteredMovies[i].medium_cover_image + `" class="card-img-top border border-5 border-accents rounded-1 w-100" onerror="this.src='assets/img/poster.jpg'">
                        <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-trans-black opacity-0 browse-hover">
                            <div class="d-flex h-100 justify-content-center align-items-center">
                                <div class="text-center">
                                    <div class="fs-4 fw-light">
                                        <span class="text-accents"><i class="las la-star text-light text-accents"></i></span><br>
                                        ` + filteredMovies[i].rating + `
                                    </div>
                                    <div class="fs-4 fw-light py-2">
                                        <div class="">` +genre+ `</div>
                                    </div>
                                    <a href="movie.html?movie_id=` + filteredMovies[i].id + `" class="btn btn-theme mt-2" target="_blank">View Now</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <a href="movie.html?movie_id=` + filteredMovies[i].id + `" class="card-title h5 text-decoration-none" target="_blank">${getTitle(filteredMovies[i])}</a>
                        <p class="card-text">` + filteredMovies[i].year + `</p>
                    </div>
            </div>        `

    }
    singleBrowseContainer.innerHTML = html;
}
function getFilteredMoviesData() {
    let qualityVal = quality.value,
        genreVal = genre.value,
        yearVal = year.value,
        orderByVal = orderBy.value,
        ratingsVal = ratings.value;
    fetch(window.api_url+'/api/list_movies.php?page='+pageNo+'&quality='+qualityVal+'&genre='+genreVal+'&year='+yearVal+'&order_by='+orderByVal+'&minimum_rating='+ratingsVal).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        console.log(res);
        filteredMovies = res.data.movies;
        filteredMoviesData = res.data;
        showFilteredMovies();
        pagination();
    })
}
ratings.addEventListener('change',()=>{
    let ratingsVal = ratings.value;
    ratingShow.innerHTML = ratingsVal;
});
window.onload =  function (){
    const searchParam = new URLSearchParams(window.location.search);
    pageNo = searchParam.get('page') == null ? 1 :searchParam.get('page');
    getFilteredMoviesData();
}