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
    <h2 class="text-white fw-bold pt-5 pb-3 text-center">Recent Movies</h2>
</div>
<!--recent Movies-->
<div id="recent_movies"></div>
<!--recent Movies-->
<!--pagination-starts-here-->
<div class="px-4 d-flex justify-content-center" id="browseMovieContainer">
    <nav>
        <ul class="pagination py-2" id="paginationContent">
            <!--data fro api-->
        </ul>
    </nav>
</div>

<!--footer-->
<?php include "component/php/footer.php";?>
<!--footer-->
<!--pagination-ends-here-->
<script src="/assets/js/handlebars.min.js"></script>
<script src="/assets/js/recent.js?<?php echo uniqid(); ?>"></script>
<script src="/assets/js/search.js?<?php echo uniqid(); ?>"></script>
</body>
</html>