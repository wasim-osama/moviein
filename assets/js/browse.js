
let browseInput = document.getElementById('browseInput'),
    quality = document.getElementById('quality'),
    genre = document.getElementById('genre'),
    orderBy = document.getElementById('orderBy'),
    ratings = document.getElementById('ratings'),
    searchBtn = document.getElementById('searchBtn'),
    ratingShow = document.getElementById('ratingShow'),
    browseMovieData = [],
    paginationContent = document.getElementById('paginationContent'),
    navbarToggler = document.querySelector('.navbar-toggler');
let PageNo = 0;




navbarToggler.addEventListener('click', () => {
    document.querySelector('.nav-scroller').classList.add('attachTop');
    document.getElementById('browse-active').classList.add('active-responsive');
});
function pagination(){
    let totalPage = Math.ceil(browseMovieData.movie_count / browseMovieData.limit);
    let currentPage = browseMovieData.page_number;


    let html = '';
    let pageLi = 1;
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">< Previous</a></li>`;

    if (currentPage >= 6){
        html += `<li class="page-item"><a onclick="gotoPage(1)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">`+1+`</a></li>`;
        html += `<li class="page-item"><a onclick="gotoPage(2)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">`+2+`</a></li>`;
        html += `<li class="page-item"><a  class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">..</a></li>`;
    }
    if ((currentPage - 3) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 3)+`)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">`+(currentPage - 3)+`</a></li>`;
    }
    if ((currentPage - 2) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 2)+`)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">`+(currentPage - 2)+`</a></li>`;
    }
    if ((currentPage - 1) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">`+(currentPage - 1)+`</a></li>`;
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+ currentPage +`)" class="page-link text-light border-danger px-4 py-2 bg-danger" role="button">`+currentPage+`</a></li>`;
    if (currentPage < (totalPage - 3)){
        if ((currentPage + 1) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">`+(currentPage + 1)+`</a></li>`;
        }
        if ((currentPage + 2) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 2)+`)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">`+(currentPage + 2)+`</a></li>`;
        }
        if ((currentPage + 3) <= totalPage) {
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 3)+`)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">` + (currentPage + 3) + `</a></li>`;
        }
    }

    let reqPageStart = currentPage + 4;
    let reqPage = reqPageStart + (7 - pageLi);
    for (let i = reqPageStart; i < reqPage; i++){
        html += `<li class="page-item"><a onclick="gotoPage(+i+)" class="page-link bg-dark text-light border-danger px-4 py-2" role="button">` +i+ `</a></li>`;
    }
    if (currentPage < totalPage){
        if (currentPage <= totalPage){
            html += `<li class="page-item"><a class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">..</a></li>`;
            html += `<li class="page-item"><a onclick="gotoPage(`+totalPage+`)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">`+totalPage+`</a></li>`;
        }
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-danger px-4 py-2 cursor" role="button">next ></a></li>`;
    paginationContent.innerHTML = html;
    console.log(pageLi);

}
function gotoPage(page){
    pageNo = page;
    getFilteredMoviesData();
}
function getLastPart() {
    const parts = url.split('/');
    return parts.at(-1);
}

let url = window.location.href;
let lastRoute = getLastPart(url);
console.log(lastRoute);
console.log('browse.php' === lastRoute)
if ('browse.php' === lastRoute){
    document.getElementById('browse-nav').classList.add('nav-hov-active');
}

function hidePreloader(){
    document.querySelector('.preloader').classList.add('LoaderHide');
}
function bodyScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
ratings.addEventListener('change', () => {
    let ratingsVal = ratings.value;
    ratingShow.innerHTML = ratingsVal;
})
searchBtn.addEventListener('click', () => {
    getFilteredMoviesData();
})


function getFilteredMoviesData() {
    let query = browseInput.value.toLowerCase(),
        qualityVal = quality.value,
        genreVal = genre.value,
        orderByVal = orderBy.value,
        ratingsVal = ratings.value;
    fetch(window.api_url+'/api/list_movies.php?page='+pageNo+'&quality='+qualityVal+'&genre='+genreVal+'&order_by='+orderByVal+'&minimum_rating='+ratingsVal+'&query_term='+query).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        hidePreloader();
        console.log(res);
        const Movies = res.data.movies;
        browseMovieData = res.data;
        showMovies(Movies);
    })
}


function showMovies(Movies){
    fetch('/component/hbs/list_movies.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movies});
        document.getElementById('browse_page').innerHTML = template;
        pagination();
    })
}

window.onload = () =>{
    const searchParam = new URLSearchParams(window.location.search);
    pageNo = searchParam.get('page') == null ? 1 :searchParam.get('page');
    getFilteredMoviesData();
}