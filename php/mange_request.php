<?php

require_once './classes/table.php';

use table\table;

    if(isset($_POST)){
        $table = new table($_POST['data']);
        echo($table->read());
    }

