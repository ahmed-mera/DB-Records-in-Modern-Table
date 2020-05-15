<?php

namespace table;

interface crud {

    public function  create($data, $id);
    public function  read($id);
    public function  delete($id);
    public function  update($data, $id);

}
