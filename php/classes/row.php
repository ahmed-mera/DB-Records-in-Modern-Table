<?php


namespace table;

class row {

    public function create($data, $id){
        if ($id){
            $row = "<tr class = 'my-row' onclick='setSelect({$id})' data-id = '{$id}'>";
            foreach ($data as $key => $value){
                $row .= "<td data-id= '{$key}' > {$value}</td>";
            }
            $row .= "</tr> ";

        }else{
            $row = "<thead><tr data-id = '{$id}'>";
            foreach ($data as $key => $value){
                $row .= "<th class='th-sm' data-id= '{$key}' > {$value}</th>";
            }
            $row .= "</tr></thead>";
        }

        return $row ;
    }

    public function deleteCeil($id, $data){
        unset($data[$id]);
        return $data;
    }

    public function  addNewCeil ($data, $id) {
        return "<td data-id= '{$id}' > {$data}</td>";
    }

}

