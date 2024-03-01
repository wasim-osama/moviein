<div id="nav_fixed">
    <nav class="navbar navbar-expand-lg  border-bottom border-secondary navbar-dark py-3 nav-scroller">
        <div class="container-fluid container-custom-nav">
            <a class="navbar-brand text-danger fs-3" href="/">MovieIn</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav m-auto mb-2 mb-lg-0 text-muted">
                    <li class="nav-item px-3 mx-2 position-relative">
                        <a class="nav-link active" href="/">Home</a>
                        <div class="nav-hov position-absolute start-0 bg-danger rounded-3" id="home-nav"></div>

                    </li>
                    <li class="nav-item px-3 mx-2 position-relative">
                        <a class="nav-link active" href="/browse.php">Browse</a>
                        <div class="nav-hov position-absolute start-0 bg-danger rounded-3" id="browse-nav"></div>
                    </li>
                    <li class="nav-item px-3 mx-2 position-relative">
                        <a class="nav-link active" href="/recent.php">Recent Movies</a>
                        <div class="nav-hov position-absolute start-0 bg-danger rounded-3" id="recent-nav"></div>

                    </li>
                    <li class="nav-item px-3 mx-2 position-relative">
                        <a class="nav-link active" href="/alltime.php">All Time Blockbusters</a>
                        <div class="nav-hov position-absolute start-0 bg-danger rounded-3" id="popular-nav"></div>

                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <div class="text-light" type="button" id="searchIcon"><i class="las la-search"></i></div>
                    <div class="search-form rounded-5">
                        <div class="input-group  bg-black">
                            <input type="text" class="form-control" id="searchbar" placeholder="Search Movies">
                            <span class="input-group-text rounded-end" id="basic-addon2"><i class="las la-search"></i></span>
                            <div class="w-100 position-absolute z-2 custom-search-content left-0" id="searchContent">
                                <!--search api-->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</div>
