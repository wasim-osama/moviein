let searchbar = document.getElementById('searchbar');
let searchMovie = [];
let searchContent = document.getElementById('searchContent');
searchbar.addEventListener('input',(e) =>{
    let value = e.target.value.toLowerCase();
    console.log(value);
});

function showSearchMovies(){
    let html ='';
    for (i = 0; i < searchMovie.length; i++){
        if (i < 4){
            html +=`
        <div class="row bg-background shadow-sm d-flex align-items-center">
            <div class="col-4">
                <img src="https://www1.yts.nz`+searchMovie[i].small_cover_image+`" alt="" style="width: 40px;height: 50px" class="pb-2">
            </div>
            <div class="col-8">
                <div class="fs-6 fw-bold">`+searchMovie[i].title_english+`</div>
            </div>
            <hr>
        </div>
        `
        }

    }
    searchContent.innerHTML = html;
}
function getSearchMovies(){
    fetch('http://moviein.test/api/list_movies.php').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(res => {
        searchMovie = res.data.movies
        console.log(res);
        showSearchMovies()
    })
}
getSearchMovies()
