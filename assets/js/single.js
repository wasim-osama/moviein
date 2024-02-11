let Movie = null,
    movie_id = 0,
    MovieContainer = document.getElementById('MovieContainer');


function renderMovies(){
    let HTML = ``;
    MovieContainer.innerHTML = HTML;
}
function getSIngleMovies() {
    fetch('http://js-script.test/moviedb/api/movie_details.php?movie_id='+movie_id).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then(res => {
        Movie = res.data.movie;
        console.log(Movie);
    }).catch(error => {
        console.error('Error:', error);
    });
}


window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    movie_id = urlParams.get('movie_id');
    getSIngleMovies();
}