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
<div class="pt-5">
    <h2 class="text-white fw-bold pt-5 pb-3 text-center">Popular Movies</h2>
</div>
<!--recent Movies-->
<div id="popular_movies"></div>
<!--recent Movies-->
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
<?php include "component/php/footer.php";?>
<!--footer-->


<script src="/assets/js/handlebars.min.js"></script>
<script src="/assets/js/popular.js?<?php echo uniqid(); ?>"></script>
<script src="/assets/js/search.js?<?php echo uniqid(); ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script>
    AOS.init();
</script>
</body>
</html>