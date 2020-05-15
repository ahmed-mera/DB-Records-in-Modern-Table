<?php

namespace table;

include 'row.php';
include 'crud.php';

class table extends row implements crud
{
    private $data;

    public function  __construct($data){
        $this->data = $data;
    }

    public function create($id, $data){
        $table = '<table class="table table-striped table-bordered mt-5" cellspacing="0" width="100%">';
        if(!empty($id)){
            $showRow = $this->data[$id];
            $table .= parent::create($id, $showRow);
        }else{
            foreach ($data as $kay => $value){
                $table .= parent::create($kay, $value);
            }
        }
        $table .= "</table>";
        return $table;
    }


    public function read($id = null){
        return self::create($id, $this->data);
    }


    public function delete($id){
        unset($this->data[$id]);
        return $this->data;
    }

    public function deleteCeil($ids, $data)
    {
        $this->data[$ids['idRow']] = parent::deleteCeil($ids['idCeil'], $data);
        return $this->data;
    }

    public function update($id, $data){
        $this->data[$id] = $data;
        return $this->data;
    }

}
