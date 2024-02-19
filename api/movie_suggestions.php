<?php

include 'config.php';


$input = $_GET;
function get_movie_list($input){
    $rv = GetData('movie_suggestions.json', $input);
    echo json_encode($rv, true);exit();
}
get_movie_list($input);