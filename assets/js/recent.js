
let PageNo = 0;
function getLastPart() {
    const parts = url.split('/');
    return parts.at(-1);
}
let url = window.location.href;
let lastRoute = getLastPart(url);
console.log(lastRoute);
console.log('recent.php' === lastRoute)
if ('recent.php' === lastRoute){
    document.getElementById('recent-nav').classList.add('nav-hov-active');
}


function pagination(MovieData){
    let totalPage = Math.ceil(MovieData.movie_count / MovieData.limit);
    let currentPage = MovieData.page_number;


    let html = '';
    let pageLi = 1;
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">< Previous</a></li>`;

    if (currentPage >= 6){
        html += `<li class="page-item"><a onclick="gotoPage(1)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+1+`</a></li>`;
        html += `<li class="page-item"><a onclick="gotoPage(2)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+2+`</a></li>`;
        html += `<li class="page-item"><a  class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">..</a></li>`;
    }
    if ((currentPage - 3) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+(currentPage - 3)+`</a></li>`;
    }
    if ((currentPage - 2) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage - 2)+`</a></li>`;
    }
    if ((currentPage - 1) > 0){
        pageLi++;
        html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage - 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage - 1)+`</a></li>`;
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+ currentPage +`)" class="page-link text-light border-accents px-4 py-2 bg-success" role="button">`+currentPage+`</a></li>`;
    if (currentPage < (totalPage - 3)){
        if ((currentPage + 1) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage + 1)+`</a></li>`;
        }
        if ((currentPage + 2) <= totalPage){
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 2)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">`+(currentPage + 2)+`</a></li>`;
        }
        if ((currentPage + 3) <= totalPage) {
            pageLi++;
            html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 3)+`)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">` + (currentPage + 3) + `</a></li>`;
        }
    }

    let reqPageStart = currentPage + 4;
    let reqPage = reqPageStart + (7 - pageLi);
    for (let i = reqPageStart; i < reqPage; i++){
        html += `<li class="page-item"><a onclick="gotoPage(+i+)" class="page-link bg-dark text-light border-accents px-4 py-2" role="button">` +i+ `</a></li>`;
    }
    if (currentPage < totalPage){
        if (currentPage <= totalPage){
            html += `<li class="page-item"><a class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">..</a></li>`;
            html += `<li class="page-item"><a onclick="gotoPage(`+totalPage+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">`+totalPage+`</a></li>`;
        }
    }
    html += `<li class="page-item"><a onclick="gotoPage(`+(currentPage + 1)+`)" class="page-link bg-dark text-light border-accents px-4 py-2 cursor" role="button">next ></a></li>`;
    paginationContent.innerHTML = html;
    console.log(pageLi);

}
function gotoPage(page){
    pageNo = page;
    getRecentMovies();
}



function hidePreloader(){
    document.querySelector('.preloader').classList.add('LoaderHide');
}
function bodyScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.nav-scroller').classList.add('attachTop');
    } else {
        document.querySelector('.nav-scroller').classList.remove('attachTop');
    }
}

document.addEventListener('scroll',bodyScroll);
function getRecentMovies(){
    fetch(window.api_url+'/api/list_movies.php?page='+pageNo+'&sort_by=year').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.json();
    }).then(data => {
        hidePreloader();
        let Movie = data.data.movies;
        let MovieData = data.data;
        showRecentMovie(Movie);
        pagination(MovieData);
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
        document.getElementById('recent_movies').innerHTML = template;
    })
}

window.onload = () => {
    const searchParam = new URLSearchParams(window.location.search);
    pageNo = searchParam.get('page') == null ? 1 :searchParam.get('page');
    getRecentMovies();
}