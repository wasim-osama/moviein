function showBanner(Movies){
    fetch('/component/hbs/home_banner.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movies[0]});
        document.getElementById('home_banner').innerHTML = template;
    })

}
function getLastPart() {
    const parts = url.split('/');
    return parts.at(-1);
}
let url = window.location.href;
let lastRoute = getLastPart(url);
console.log(lastRoute);
console.log('' === lastRoute)
if ('' === lastRoute){
    document.getElementById('home-nav').classList.add('nav-hov-active');
}

function hidePreloader(){
    document.querySelector('.preloader').classList.add('LoaderHide');
}

function bodyScroll() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
function showList(Movies){
    fetch('/component/hbs/list_movies.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movies.slice(1, 17)});
        document.getElementById('list_movies').innerHTML = template;
    })
}
function getMovies(){
    fetch(window.api_url+'/api/list_movies.php?sort_by=year&minimum_rating=5&order_by=desc&limit=17').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        hidePreloader();
        console.log(data);
       const Movies = data.data.movies;
        showBanner(Movies);
        showList(Movies);
    })
}

window.onload = () => {
    getMovies();
}