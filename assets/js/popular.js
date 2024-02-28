

function bodyScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
function getRecentMovies(){
    fetch(window.api_url+'/api/list_movies.php?sort_by=rating').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        let Movie = data.data.movies;
        showRecentMovie(Movie);
        console.log(Movie);
    })
}
function showRecentMovie(Movie){
    fetch('/component/hbs/list_movies.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movie});
        document.getElementById('popular_movies').innerHTML = template;
    })
}

window.onload = () => {
    getRecentMovies();
}