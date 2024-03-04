
let browseInput = document.getElementById('browseInput'),
    quality = document.getElementById('quality'),
    genre = document.getElementById('genre'),
    year = document.getElementById('year'),
    orderBy = document.getElementById('orderBy'),
    ratings = document.getElementById('ratings'),
    searchBtn = document.getElementById('searchBtn'),
    ratingShow = document.getElementById('ratingShow'),
    navbarToggler = document.querySelector('.navbar-toggler');



navbarToggler.addEventListener('click', () => {
    document.querySelector('.nav-scroller').classList.add('attachTop');
})

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
        yearVal = year.value,
        orderByVal = orderBy.value,
        ratingsVal = ratings.value;
    fetch(window.api_url+'/api/list_movies.php?page='+pageNo+'&sort_by=year&quality='+qualityVal+'&genre='+genreVal+'&year='+yearVal+'&order_by='+orderByVal+'&minimum_rating='+ratingsVal+'&query_term='+query).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        hidePreloader();
        console.log(res);
        const Movies = res.data.movies;
        const MoviesData = res.data;
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
    })
}

window.onload = () =>{
    const searchParam = new URLSearchParams(window.location.search);
    pageNo = searchParam.get('page') == null ? 1 :searchParam.get('page');
    getFilteredMoviesData();
}