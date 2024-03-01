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
<script src="/assets/js/handlebars.min.js"></script>
<script src="/assets/js/recent.js?<?php echo uniqid(); ?>"></script>
</body>
</html>