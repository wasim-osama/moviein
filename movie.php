<!doctype html>
<html lang="en">
<head>
    <?php include 'component/php/head.php'; ?>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css">
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

<!--single Page-->
    <div id="single_page"></div>
<!--single Page-->

<!--footer-->
<?php include "component/php/footer.php";?>
<!--footer-->

<!--fancybox-->
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
<!--fancybox-->
<!--app js-->
<script src="/assets/js/handlebars.min.js?<?php echo uniqid(); ?>"></script>
<script src="/assets/js/single.js?<?php echo uniqid(); ?>"></script>
<script src="/assets/js/search.js?<?php echo uniqid(); ?>"></script>
<!--
<script src="assets/js/search.js"></script>
-->

<!--app js-->

</body>
</html>

