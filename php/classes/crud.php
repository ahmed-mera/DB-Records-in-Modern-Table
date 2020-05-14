<?php

namespace table;

interface crud {

    public function  create($id, $data);
    public function  read($id);
    public function  delete($id);
    public function  update($id, $data);

}
