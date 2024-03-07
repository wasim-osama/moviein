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


<!--Home banner-->
<div id="home_banner"></div>
<!--Home banner-->
<!--List Movies-->
<div id="list_movies"></div>
<!--List Movies-->
<!--footer-->
<?php include "component/php/footer.php";?>
<!--footer-->
<script src="/assets/js/handlebars.min.js"></script>
<script src="/assets/js/home.js?<?php echo uniqid(); ?>"></script>
<script src="/assets/js/search.js"></script>
</body>
</html>