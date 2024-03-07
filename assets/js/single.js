
let downloadBtn = null;
let downloadBtnClose = null;
console.log(downloadBtnClose);

function bodyScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
function hidePreloader(){
    document.querySelector('.preloader').classList.add('LoaderHide');
}
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
        downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener("click", () => {
            console.log('123');
            document.getElementById('download-overlay').classList.add('download-overlay-show');
            downloadBtnClose = document.getElementById('downloadBtnClose');
            downloadBtnClose.addEventListener('click', () => {
                document.getElementById('download-overlay').classList.remove('download-overlay-show');
            })

        })

    })
}

function  getSingleMovie(){
    const searchParams = new URLSearchParams(window.location.search);
    const movie_id = searchParams.get('movie_id');
    fetch(window.api_url+'/api/movie_details.php?movie_id='+movie_id+'&with_images=true&with_cast=true').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    } ).then(res => {
        hidePreloader();
        let Movie = null;
        Movie = res.data.movie;
        console.log(Movie);
        showSingleMovie(Movie);
    })
}


window.onload = function (){
    getSingleMovie();
}
