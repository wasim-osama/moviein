function renderNav(){
    fetch('/component/nav_fixed.hbs').then(res => {
        if (!res.ok){
            throw Error;
        }
        return res.text();
    }).then(data => {
        let template = Handlebars.compile(data);
        document.getElementById('nav_fixed').innerHTML = template;
    })
}

window.onload = () => {
    renderNav();
}