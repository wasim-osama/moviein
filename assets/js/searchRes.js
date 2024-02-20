let searchbarRes = document.getElementById('searchbarRes');
let searchMovieRes = [];
let searchContentRes = document.getElementById('searchContentRes');
let searchTimeRes = null;

searchbarRes.addEventListener('keyup',() =>{
        if(searchbarRes.value.length > 0){
            clearTimeout(searchTime);
            searchTimeRes = setTimeout(()=>{
                getSearchMovies();

            },800);
        }else{
            searchContentRes.innerHTML = '';
        }
});

function showSearchMovies(){
    let html ='';
    for (i = 0; i < searchMovieRes.length; i++){
        if (i < 4){
            html +=`
        <div class="row bg-background shadow-sm d-flex align-items-center py-2 border-bottom border-accents">
            <div class="col-1">
                <img src="https://www1.yts.nz`+searchMovieRes[i].small_cover_image+`" onerror="this.src='assets/img/poster.jpg'">
            </div>
            <div class="col-10 offset-1">
                <a class="fs-6 fw-bold text-decoration-none text-light" href="movie.html?movie_id=`+searchMovieRes[i].id+`">`+searchMovieRes[i].title_english+`</a>
            </div>
        </div>
        `
        }

    }
    searchContentRes.innerHTML = html;
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
    searchContentRes.innerHTML = html;
}
function getSearchMovies(){
    let q  = searchbarRes.value.toLowerCase();
    fetch('http://moviein.test/api/list_movies.php?sort_by=rating&order_by=desc&query_term='+q).then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        if (res?.data?.movies !== undefined && res?.data?.movies.length){
            searchMovieRes = res?.data?.movies;
            console.log(res);
            showSearchMovies();
        }else{
            noResSearchMovies();
        }

    })
}
