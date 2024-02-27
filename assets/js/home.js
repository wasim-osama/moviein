function showBanner(Movies){
    fetch('../component/home_banner.hbs').then(res => {
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
function bodyScroll() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
function showNav(){
    fetch('/component/nav_fixed.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        Handlebars.compile(data);
        document.getElementById('nav_fixed').innerHTML = data;
    })
}
function showList(Movies){
    fetch('/component/list_movies.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movies});
        document.getElementById('list_movies').innerHTML = template;
    })
}
function getMovies(){
    fetch('http://moviein.test/api/list_movies.php?sort_by=year&minimum_rating=5&order_by=desc&limit=17').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        console.log(data);
       const Movies = data.data.movies;
        showNav();
        showBanner(Movies);
        showList(Movies);
    })
}

window.onload = () => {
    getMovies();

}