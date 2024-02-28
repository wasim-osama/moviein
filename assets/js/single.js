
Fancybox.bind('[data-fancybox="gallery"]', {
    // Your custom options for a specific gallery
});



function showSingleMovie(Movie){
    fetch('/component/hbs/single_page.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        template = template({Movie : Movie})
        document.getElementById('single_page').innerHTML = template;
    })
}

function  getSingleMovie(){
    const searchParams = new URLSearchParams(window.location.search);
    const movie_id = searchParams.get('movie_id');
    fetch('http://moviein.test/api/movie_details.php?movie_id='+movie_id+'&with_images=true&with_cast=true').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    } ).then(res => {
        let Movie = null;
        Movie = res.data.movie;
        console.log(Movie);
        showSingleMovie(Movie);
    })
}


window.onload = function (){
    getSingleMovie();
}
