<?php
    if $_GET["type"] == "1"{
      echo file_get_contents('https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw');
    }
    else{
      echo file_get_contents('https://www.youtube.com/results?search_query='.$_GET["search_term"]);
    }
?>
