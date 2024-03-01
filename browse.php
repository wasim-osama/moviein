<!doctype html>
<html lang="en">
<head>
    <?php include 'component/php/head.php'; ?>
</head>
<body>


<?php include 'component/php/nav.php'; ?>

<div class="preloader z-3">
    <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</div>

<div class="w-100 py-5">
    <div class="container">
        <div class="w-100 py-4 px-5 mt-5 text-light">
            <!--Search-bar start here-->
            <label class="h3 fw-normal">Search Term</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-dark text-light border-accents border-end-0"
                       placeholder="Recipient's username" aria-label="Recipient's username"
                       aria-describedby="basic-addon2" id="browseInput">
                <button class="input-group-text bg-black border-accents border-start-0 text-decoration-none" id="searchBtn"><i
                        class="las la-search text-light"></i></button>
            </div>
            <!--Search-bar end here-->
            <!--filter-custom starts here-->
            <div class="row">
                <div class="col-sm-3 col-6">
                    <div class="h4">
                        Quality
                    </div>
                    <select class="form-select bg-dark text-light border-accents"
                            aria-label="Default select example" id="quality">
                        <option disabled selected value>Open this select menu</option>
                        <option value="2600p">4k</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                    </select>
                </div>
                <div class="col-sm-3 col-6">
                    <div class="h4">
                        Genre
                    </div>
                    <select class="form-select bg-dark text-light border-accents"
                            aria-label="Default select example" id="genre">
                        <option disabled selected value>Open this select menu</option>
                        <option value="romantic">Romantic</option>
                        <option value="horror">Horror</option>
                        <option value="adventure">Adventure</option>
                    </select>
                </div>
                <div class="col-sm-3 col-6">
                    <div class="h4">
                        Year
                    </div>
                    <select class="form-select bg-dark text-light border-accents"
                            aria-label="Default select example" id="year">
                        <option disabled selected value>Select Specific year</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                    </select>
                </div>
                <div class="col-sm-3 col-6">
                    <div class="h4">
                        Order By
                    </div>
                    <select class="form-select bg-dark text-light border-accents"
                            aria-label="Default select example" id="orderBy">
                        <option disabled selected value>Open this select menu</option>
                        <option value="desc">desc</option>
                        <option value="asc">asc</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="row pt-3">
                <div class="col-lg-2 col-md-1">
                    <div class="h4">
                        Ratings
                    </div>
                </div>
                <div class="col-lg-8 col-md-10">
                    <div class="input-group align-items-center">
                        <div class="fw-light fs-4">0</div>
                        <input type="range" class="form-range px-2 w-90" min="0" max="10" id="ratings" value="0">
                        <div class="fw-light fs-4">10</div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-1">
                    <div class="h4">
                        <span class="text-accents"><i class="las la-star"></i></span>
                        <span  id="ratingShow">0</span>
                        <span class="small fw-lighter">/10</span>
                    </div>
                </div>
            </div>
            <!--filter-custom ends here-->
        </div>
    </div>
</div>

<!--browse_page-->
<div id="browse_page"></div>
<!--browse_page-->


<script src="/assets/js/handlebars.min.js"></script>
<script src="assets/js/browse.js?<?php echo uniqid(); ?>"></script>

</body>
</html>