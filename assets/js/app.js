let Movies = [],
    pnMovieContainer = document.getElementById('pnMovieContainer'),
    newMovieContainer = document.getElementById('newMovieContainer');

let splide = new Splide( '.splide', {
    type   : 'loop',
    padding: '5rem',
} );

function showPnMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g < Movies[i].genres.length; g++){
            genre += '<span class="badge bg-info me-1">'+Movies[i].genres[g]+'</span>';
        }
         HTML += `
        <div class="col-lg-3 col-md-4">
            <div class="card text-bg-dark border-light-subtle">
                <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img">
                <div class="card-body text-center">
                    <h5 class="card-title">`+Movies[i].title_english+`</h5>
                    <p class="card-text" id="genre">`+genre+`</p>
                    <p class="card-text"><span class="text-warning"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                    <a class="btn btn-danger">Download Now!</a>
                </div>
            </div>
         </div>
        `;

        pnMovieContainer.innerHTML = HTML;
    }

}
function showNewMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g< Movies[i].genres.length; g++){
            genre += '<span class="badge bg-info me-1">'+Movies[i].genres[g]+'</span>';
        }
        HTML += `
            <div class="col-lg-3 col-md-4">
                <div class="card text-bg-dark border-light-subtle">
                    <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img">
                    <div class="card-body text-center">
                        <h5 class="card-title">`+Movies[i].title_english+`</h5>
                        <p class="card-text" id="genre">`+genre+`</p>
                        <p class="card-text"><span class="text-warning"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                         <a class="btn btn-danger">Download Now!</a>
                    </div>
                </div>
            </div>
        `
        newMovieContainer.innerHTML = HTML;
    }
}
function getPnMovies(){
    fetch("http://moviein.test/api/list_movies.php?sort_by=year&minimum_rating=8&limit=4").then(res => {
        if (!res.ok){
            throw "error in fetching getPnMovies"
        }
        return res.json();
    } ).then(res => {
        Movies = res.data.movies;
        showPnMovies();
    })
}
function getNewMovies(){
    fetch('http://moviein.test/api/list_movies.php?sort_by=year&order_by=desc&limit=4').then(res => {
        if (!res.ok){
            throw "error in fetching getNewMovies"
        }
        return res.json();
    }).then(res => {
        Movies = res.data.movies;
        showNewMovies()
        console.log(Movies);
    });
}


window.onload = () => {
    getPnMovies();
    getNewMovies();
    splide.mount();
}