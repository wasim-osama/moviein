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
            <div class="row">
                <div class="col-sm-8">
                    <label class="h5 pb-2 fw-normal pb-2">Search Term</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control bg-dark text-light border-danger"
                               placeholder="Search Movie By Name" aria-label="Recipient's username"
                               aria-describedby="basic-addon2" id="browseInput">
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="h5 pb-2">
                        Order By
                    </div>
                    <select class="form-select bg-dark text-light border-danger"
                            aria-label="Default select example" id="orderBy">
                        <option disabled selected value>Select Order By</option>
                        <option value="desc">desc</option>
                        <option value="asc">asc</option>
                    </select>
                </div>
                <!--Search-bar end here-->
                <!--filter-custom starts here-->
                <div class="col-6">
                    <div class="h5 pb-2">
                        Quality
                    </div>
                    <select class="form-select bg-dark text-light border-danger"
                            aria-label="Default select example" id="quality">
                        <option disabled selected value>Select Quality</option>
                        <option value="2160p">4k</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                    </select>
                </div>
                <div class="col-6">
                    <div class="h5 pb-2">
                        Genre
                    </div>
                    <select class="form-select bg-dark text-light border-danger"
                            aria-label="Default select example" id="genre">
                        <option disabled selected value>Select Genre</option>
                        <option value="romantic">Romantic</option>
                        <option value="horror">Horror</option>
                        <option value="adventure">Adventure</option>
                    </select>
                </div>

            </div>
            <div class="row pt-5 text-center">
                <div class="col-md-2">
                    <div class="h5 pb-2">
                        Ratings
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="input-group align-items-center justify-content-center">
                        <div class="fw-light fs-4">0</div>
                        <input type="range" class="form-range px-2 w-80 w-sm-" min="0" max="10" id="ratings" value="0">
                        <div class="fw-light fs-4">10</div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="h5 pb-2">
                        <span class="text-danger"><i class="las la-star"></i></span>
                        <span id="ratingShow">0</span>
                        <span class="small fw-lighter">/10</span>
                    </div>
                </div>
            </div>
            <!--filter-custom ends here-->
        </div>
    </div>
    <button class="btn btn-danger text-decoration-none m-auto d-flex justify-content-center"
            id="searchBtn">
        Search
    </button>
</div>

<!--browse_page-->
<div id="browse_page"></div>
<!--browse_page-->
<!--pagination-starts-here-->
<div class="px-4 d-flex justify-content-center" id="browseMovieContainer">
    <nav>
        <ul class="pagination py-2" id="paginationContent">
            <!--data fro api-->
        </ul>
    </nav>
</div>
<!--pagination-ends-here-->

<!--footer-->
<?php include "component/php/footer.php"; ?>
<!--footer-->

<script src="/assets/js/handlebars.min.js"></script>
<script src="assets/js/browse.js?<?php echo uniqid(); ?>"></script>
<script src="assets/js/search.js?<?php echo uniqid(); ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script>
    AOS.init();
</script>

</body>
</html>