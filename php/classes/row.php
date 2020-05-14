<?php


namespace table;

class row {

    protected function createRow($id, $data){
        if ($id){
            $row = "<tbody> <tr class = 'my-row' onclick='setSelect({$id})' data-id = '{$id}'>";
            foreach ($data as $key => $value){
                $row .= "<td data-id= '{$key}' > {$value}</td>";
            }
            $row .= "</tr> </tbody>";

        }else{
            $row = "<thead> <tr data-id = '{$id}'>";
            foreach ($data as $key => $value){
                $row .= "<th class='th-sm' data-id= '{$key}' > {$value}</th>";
            }
            $row .= "</tr> </thead>";
        }

        return $row ;
    }

    protected function deleteCeil($id, $data){
        unset($data[$id]);
        return $data;
    }

}

