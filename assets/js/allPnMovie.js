let allPnMovieContainer = document.getElementById('allPnMovieContainer');
let AllPnMovie = [];
screenSize= window.matchMedia("(max-width: 991px)");
function charLimit(str,limit){
    if (str.length > limit){
        str = str.substring(0,limit)+"...";
    }
    return str;
}


function showAllPnMovies(){
    let HTML = '';
    for (let i = 0; i < AllPnMovie.length; i++){
        let genre = '';
        for (let g = 0; g < AllPnMovie[i].genres.length; g++){
            if (g < 2){
                if (!screenSize.matches){
                    genre += '<span class="badge bg-accents text-black-50">'+AllPnMovie[i].genres[g]+'</span>';
                }else{
                    genre += '<span class="badge bg-accents text-black-50">'+AllPnMovie[i].genres[g].substring(0,3)+'.</span>';
                }
            }
        }
        HTML += `
        <div class="col-xxl-3 col-lg-4 col-md-4 col-sm-6 mb-3">
            <div class="card border-0 bg-secondary-cus text-light shadow-sm">
            <div class="img-box">                
                <img src="https://www1.yts.nz/`+ AllPnMovie[i].medium_cover_image +`"  class="card-img w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
            </div>
                <div class="card-body text-center">
                    <h6 class="card-title card-title-custom">`+charLimit(AllPnMovie[i].title_english, 18)+`</h6>
                    <p class="card-text">`+genre+`</p>
                    <p class="card-text"><span class="text-warning"><i class="las la-star"></i></span>`+AllPnMovie[i].rating+`/10</p>
                    <a href="movie.html?movie_id=`+AllPnMovie[i].id+`" class="btn btn-theme">Download Now!</a>
                </div>
            </div>
         </div>
        `;
    }
    allPnMovieContainer.innerHTML = HTML
}
function getAllPnMovies(){
    fetch("http://moviein.test/api/list_movies.php?sort_by=year&minimum_rating=8&lpage=1").then(res => {
        if (!res.ok){
            throw "error in fetching getPnMovies"
        }
        return res.json();
    } ).then(res => {
        AllPnMovie = res.data.movies;
        showAllPnMovies();

    })
}

getAllPnMovies();
