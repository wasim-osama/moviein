let Movies = [],
    pnMovieContainer = document.getElementById('pnMovieContainer'),
    newMovieContainer = document.getElementById('newMovieContainer'),
    actionMovieContainer = document.getElementById('actionMovieContainer'),
    pMovieContainer = document.getElementById('pMovieContainer'),
    screenSize= window.matchMedia("(max-width: 991px)");

function initSplide (){
    let splide = new Splide( '.splide', {
        type   : 'loop',
        padding: '5rem',
        pagination: false,
        autoplay: 'play',
        breakpoints: {
            768: {
                padding: 0,
            },
        }
    } );
    splide.mount();
}

function charLimit(str,limit){
    if (str.length > limit){
        str = str.substring(0,limit)+"...";
    }
    return str;
}

function showActionMovies(){
    let HTML = '';
    for(let i = 0; i < Movies.length; i++ ){
        let genre = '';
        for (let g = 0; g < Movies[i].genres.length; g++){
            genre += '<span class="badge bg-accents text-black-50 me-1">'+Movies[i].genres[g]+'</span>'
        }
        HTML += `
        <div class="card slider splide__slide bg-background" data-splide-interval="10000">
            <img src="https://www1.yts.nz/`+Movies[i].background_image_original+`" class="card-img w-100 h-100 opacity-50">
            <div class="card-img-overlay overlay-custom">
                <img class="m-auto h-100" src="https://www1.yts.nz/`+Movies[i].medium_cover_image+`" onerror="this.src'assets/img/poster.jpg';" ">
            </div>    
            <div class="start-300p responsive-slider text-light card-img-overlay d-flex flex-column  justify-content-center align-items-center" >
                <h5 class="card-title fs-1">`+charLimit(Movies[i].title_english,30)+`</h5>
                <p class="card-text">`+genre+`</p>
                <p class="card-text">
                <span class="text-accents fw-bold"><i class="las la-star"></i></span>
                `+Movies[i].rating+`/10</p>
                <a href="movie.html?movie_id=`+Movies[i].id+`" class="btn btn-theme btn-width">Download Now</a>
            </div>
         </div>
        `
    }
    actionMovieContainer.innerHTML = HTML;
    initSplide ();

}
function showPnMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g < Movies[i].genres.length; g++){
            if (g < 2){
                if (!screenSize.matches){
                    genre += '<span class="badge bg-accents text-black-50">'+Movies[i].genres[g]+'</span>';
                }else{
                    genre += '<span class="badge bg-accents text-black-50">'+Movies[i].genres[g].substring(0,3)+'.</span>';
                }
            }
        }
         HTML += `
        <div class="col-xxl-3 col-lg-4 col-md-4 col-sm-6 mb-2">
            <div class="card border-0 bg-secondary-cus text-light shadow-sm">
            <div class="img-box">                
                <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
            </div>
                <div class="card-body text-center">
                    <h6 class="card-title card-title-custom">`+charLimit(Movies[i].title_english, 18)+`</h6>
                    <p class="card-text">`+genre+`</p>
                    <p class="card-text"><span class="text-warning"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                    <a href="movie.html?movie_id=`+Movies[i].id+`" class="btn btn-theme">Download Now!</a>
                </div>
            </div>
         </div>
        `;


    }
    pnMovieContainer.innerHTML = HTML;

}
function showPMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g  = 0; g < Movies[i].genres.length; g++){
            if (g < 2){
                genre += '<span class="badge bg-accents text-black-50 me-1">'+Movies[i].genres[g].substring(0,3)+'.</span>';
            }
        }
         HTML += `
         <div class="card border-gray shadow-sm text-light mb-2 bg-secondary-cus">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="img-fluid rounded-start  w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <a href="movie.html?movie_id=`+Movies[i].id+`" class="card-title fw-lighter h6 text-light text-decoration-none">`+charLimit(Movies[i].title_english, 10)+`</a>
                        <p class="card-text fw-lighter genre">`+genre+`</p>
                        <p class="card-text fw-lighter small"><span class="text-accents"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                    </div>
                </div>
            </div>
         </div>
        `;


    }
    pMovieContainer.innerHTML = HTML;

}
function showNewMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g< Movies[i].genres.length; g++){
            if (g < 2){
                if (!screenSize.matches){
                    genre += '<span class="badge bg-accents text-black-50">'+Movies[i].genres[g]+'</span>';
                }else{
                    genre += '<span class="badge bg-accents text-black-50">'+Movies[i].genres[g].substring(0,3)+'.</span>';
                }
            }
        }
        HTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                <div class="card border-0 bg-secondary-cus text-light shadow-sm">
                <div class="img-box">  
                    <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
                </div>    
                    <div class="card-body text-center">
                        <h5 class="card-title">`+Movies[i].title_english+`</h5>
                        <p class="card-text" id="genre">`+genre+`</p>
                        <p class="card-text"><span class="text-accents"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                        <a href="movie.html?movie_id=`+ Movies[i].id +`" class="btn btn-theme">Download Now!</a>
                    </div>
                </div>
            </div>
        `
    }
    newMovieContainer.innerHTML = HTML;
}
function getActionMovies(){
    fetch('http://moviein.test/api/list_movies.php?sort_by=rating&order_by=desc&genre=action&limit=10').then(res =>{
        if (!res.ok){
            throw "error in fetching getActionMovies";
        }
        return res.json();
    }).then(res =>{
        Movies = res.data.movies;
        console.log(Movies);
        showActionMovies();
    });
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
function getPMovies(){
    fetch("http://moviein.test/api/list_movies.php?sort_by=rating&order_by=asc&minimum_rating=8&limit=3").then(res => {
        if (!res.ok){
            throw "error in fetching getPnMovies"
        }
        return res.json();
    }).then(res => {
        Movies = res.data.movies;
        showPMovies();
    })
}
function getNewMovies(){
    fetch('http://moviein.test/api/list_movies.php?sort_by=year&order_by=desc&minimum_rating:5&limit=4').then(res => {
        if (!res.ok){
            throw "error in fetching getNewMovies"
        }
        return res.json();
    }).then(res => {
        Movies = res.data.movies;
        showNewMovies();
    });
}



window.onload = () => {
    getPnMovies();
    getNewMovies();
    getActionMovies();
    getPMovies();
}