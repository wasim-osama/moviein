function renderBanner(movies) {
    fetch("/component/home_banner.hbs").then(res => {
        if (!res.ok) {
            throw "error in fetching getPnMovies"
        }
        return res.text();
    }).then(res => {
        var template = Handlebars.compile(res);
        template = template({movie: movies[0]})
        document.getElementById('home_banner').innerHTML = template;
    })
}
function renderMovies(movies) {

    fetch("/component/movie_card.hbs").then(res => {
        if (!res.ok) {
            throw "error in fetching getPnMovies"
        }
        return res.text();
    }).then(res => {
        var template = Handlebars.compile(res);
        template = template({movies: movies})
        document.getElementById('movie_list').innerHTML = template;
    })
}

function getMovies() {
    fetch("http://moviein.test/api/list_movies.php?sort_by=year&order_by=desc&limit=17").then(res => {
        if (!res.ok) {
            throw "error in fetching getPnMovies"
        }
        return res.json();
    }).then(res => {
        const movies = res.data.movies;
        renderMovies(movies)
        renderBanner(movies)
    })
}


window.onload = () => {
    getMovies();
}