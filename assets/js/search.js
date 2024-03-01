let searchbar = document.getElementById('searchbar');
let searchMovie = [];
let searchContent = document.getElementById('searchContent');
let searchTime = null,
    searchIcon = document.getElementById('searchIcon');

searchIcon.addEventListener('click', () => {
    searchIcon.style.display = 'none';
    document.querySelector('.search-form').style.display = 'block';
});
searchbar.addEventListener('keyup',() =>{
        if(searchbar.value.length > 0){
            clearTimeout(searchTime);
            searchTime = setTimeout(()=>{
                getSearchMovies();

            },800);
        }else{
            searchContent.innerHTML = '';
        }
});

function showSearchMovies(){
    let html ='';
    for (let i = 0; i < searchMovie.length; i++){
        if (i < 4){
            html +=`
        <div class="row bg-background shadow-sm d-flex align-items-center py-2 border-bottom border-accents">
            <div class="col-1">
                <img src="https://www1.yts.nz`+searchMovie[i].small_cover_image+`" onerror="this.src='assets/img/poster.jpg'">
            </div>
            <div class="col-8 offset-2">
                <a class="fs-6 fw-bold text-decoration-none text-light" href="movie.html?movie_id=`+searchMovie[i].id+`">`+searchMovie[i].title_english.substring(0,20)+`..</a>
            </div>
        </div>
        `
        }

    }
    searchContent.innerHTML = html;
}
function noResSearchMovies(){
    let html ='';
    html +=`
        <div class="row bg-background shadow-sm d-flex align-items-center py-2 border-bottom border-accents">
            <div class="col-1">
                <img src="assets/img/poster.jpg" onerror="this.src='assets/img/poster.jpg'" class="w-100">
            </div>
            <div class="col-10 offset-1">
                <a class="fs-6 fw-bold text-decoration-none text-light">No Movie Found</a>
            </div>
        </div>
        `
    searchContent.innerHTML = html;
}
function getSearchMovies(){
    let q  = searchbar.value.toLowerCase();
    fetch(window.api_url+'/api/list_movies.php?sort_by=rating&order_by=desc&query_term='+q).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        if (res?.data?.movies !== undefined && res?.data?.movies.length){
            searchMovie = res?.data?.movies;
            console.log(res);
            showSearchMovies();
        }else{
            noResSearchMovies();
        }

    })
}
