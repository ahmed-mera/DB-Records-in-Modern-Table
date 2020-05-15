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

    public function create($data, $id){
        $table = '<table id="dtBasicExample" class="table table-striped table-bordered mt-5" cellspacing="0" width="100%">';
//        if(!empty($id)){
//            $showRow = $this->data[$id];
//            $table .= parent::create($showRow, $id);
//        }else{
            foreach ($data as $key => $value){
                $table .= parent::create($value, $key);
            }
//        }
        $table .= "</table>";
        return $table;
    }


    public function read($id = null){
        return self::create($this->data, $id);
    }


    public function delete($id){
        unset($this->data[$id]);
        return  self::create( $this->data, null);
    }

    public function deleteCeil($ids, $data){
        $this->data[$ids['idRow']] = parent::deleteCeil($ids['idCeil'], $data);
        return  self::create( $this->data, null);
    }

    public function update($id, $data){
        $this->data[$id] = $data;
        return  self::create( $this->data, null);

    }

}
