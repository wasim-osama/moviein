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

function getMovies(){
    fetch('http://moviein.test/api/list_movies.php').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        console.log(data);
       const Movies = data.data.movies;
        showBanner(Movies);
    })
}

window.onload = () => {
getMovies()
}