let Movies = [],
    pnMovieContainer = document.getElementById('pnMovieContainer'),
    newMovieContainer = document.getElementById('newMovieContainer'),
    actionMovieContainer = document.getElementById('actionMovieContainer'),
    pMovieContainer = document.getElementById('pMovieContainer');

function initSplide (){
    let splide = new Splide( '.splide', {
        type   : 'loop',
        padding: '5rem',
    } );
    splide.mount();
}

function charLimit(str,limit){
    if (str.length > limit){
        str = str.substring(0,limit)+"...";
    }
    return str;
}

function showPnMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g < Movies[i].genres.length; g++){
            genre += '<span class="badge bg-accents text-black-50 me-1">'+Movies[i].genres[g]+'</span>';
        }
         HTML += `
        <div class="col-lg-3 col-md-4">
            <div class="card border-0 bg-secondary-cus text-light shadow-sm">
            <div class="img-box">                
                <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
            </div>
                <div class="card-body text-center">
                    <h5 class="card-title">`+charLimit(Movies[i].title_english, 20)+`</h5>
                    <p class="card-text" id="genre">`+genre+`</p>
                    <p class="card-text"><span class="text-warning"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                    <a class="btn btn-theme">Download Now!</a>
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
                        <h5 class="card-title fw-lighter">`+charLimit(Movies[i].title_english, 10)+`</h5>
                        <p class="card-text fw-lighter">`+genre+`</p>
                        <p class="card-text fw-lighter small"><span class="text-accents"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                    </div>
                </div>
            </div>
         </div>
        `;


    }
    pMovieContainer.innerHTML = HTML;

}

function showActionMovies(){
    let HTML = '';
    for(let i = 0; i < Movies.length; i++ ){
        let genre = '';
        for (let g = 0; g < Movies[i].genres.length; g++){
            genre += '<span class="badge bg-accents text-black-50 me-1">'+Movies[i].genres[g]+'</span>'
        }
        HTML += `
        <div class="card slider splide__slide bg-background">
            <img src="https://www1.yts.nz/`+Movies[i].background_image_original+`" class="card-img w-100 h-100 opacity-50">
            <div class="card-img-overlay overlay-custom">
                <img class="m-auto h-100" src="https://www1.yts.nz/`+Movies[i].medium_cover_image+`" alt="`+Movies[i].title_english+`">
            </div>    
            <div class="start-300p text-light card-img-overlay d-flex flex-column  justify-content-center">
                <h5 class="card-title fs-1">`+charLimit(Movies[i].title_english,30)+`</h5>
                <p class="card-text">`+genre+`</p>
                <p class="card-text">
                <span class="text-accents fw-bold"><i class="las la-star"></i></span>
                `+Movies[i].rating+`/10</p>
                <a class="btn btn-theme">Download Now</a>
            </div>
         </div>
        `
    }
    actionMovieContainer.innerHTML = HTML;
    initSplide ();

}
function showNewMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++){
        let genre = '';
        for (let g = 0; g< Movies[i].genres.length; g++){
            genre += '<span class="badge bg-accents text-black-50 me-1">'+Movies[i].genres[g]+'</span>';
        }
        HTML += `
            <div class="col-lg-3 col-md-4">
                <div class="card border-0 bg-secondary-cus text-light shadow-sm">
                <div class="img-box">  
                    <img src="https://www1.yts.nz/`+ Movies[i].medium_cover_image +`"  class="card-img w-100 h-100" onerror="this.src='assets/img/poster.jpg';">
                </div>    
                    <div class="card-body text-center">
                        <h5 class="card-title">`+Movies[i].title_english+`</h5>
                        <p class="card-text" id="genre">`+genre+`</p>
                        <p class="card-text"><span class="text-accents"><i class="las la-star"></i></span>`+Movies[i].rating+`/10</p>
                         <a class="btn btn-theme">Download Now!</a>
                    </div>
                </div>
            </div>
        `
    }
    newMovieContainer.innerHTML = HTML;
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
    } ).then(res => {
        Movies = res.data.movies;
        showPMovies();
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
        showNewMovies();
    });
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


window.onload = () => {
    getPnMovies();
    getNewMovies();
    getActionMovies();
    getPMovies()

}