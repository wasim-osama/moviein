<?php

include 'config.php';


$input = $_GET;
function get_movie_list($input){
    $rv = GetData('list_movies.json', $input);
    echo json_encode($rv, true);exit();
}
get_movie_list($input);