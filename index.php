<!doctype html>
<html lang="en">
<head>
    <?php include 'component/php/head.php'; ?>
</head>
<body>

<?php include 'component/php/nav.php'; ?>
<div class="preloader">
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
<script src="/assets/js/handlebars.min.js"></script>
<script src="/assets/js/home.js?<?php echo uniqid(); ?>"></script>
</body>
</html>