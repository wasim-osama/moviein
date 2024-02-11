let Movies = [],
    MovieContainer = document.getElementById('MovieContainer');


function renderMovies(){
    let HTML = '';
    for (let i = 0; i < Movies.length; i++) {
        let movie = Movies[i];
        let genre = '';
        for (let g = 0; g < movie.genres.length; g++) {
            genre += '<span class="badge bg-success">'+movie.genres[g]+'</span>';
        }
        HTML += `<div class="col-lg-3">
                <div class="card mb-4">
                    <img style="width: 100%;height: 310px;object-fit: cover" src="https://www1.yts.nz/`+movie.medium_cover_image+`" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">`+movie.title_english+`</h5>
                        <p class="card-text">`+movie.rating+`/10</p>
                        <p class="card-text">
                            `+genre+`
                        </p>
                        <a href="movie.html?movie_id=`+movie.id+`" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>`;
    }
    MovieContainer.innerHTML = HTML;
}
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
function getLatestMovies() {
    fetch('http://js-script.test/moviedb/api/list_movies.php?sort_by=year&order_by=desc&limit=100').then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(res => {
        Movies = res.data.movies;
        renderMovies();
    }).catch(error => {
        console.error('Error:', error);
    });
}


window.onload = () => {
    getLatestMovies();
    $(document).ready(function(){
        $(".owl-carousel").owlCarousel();
    });
}