<?php

class CategoriacientificaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCategoriacientifica($data) {
        try {
            $categoriacientifica = new Categoriacientifica();
            $categoriacientifica->idpersona = $data->idpersona;
            $categoriacientifica->nombre = $data->nombre;
            if (isset($data->fecha)) {
                $tem_date = explode('T', $data->fecha);
                $categoriacientifica->fecha = $tem_date[0];
            }
            $categoriacientifica->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modCategoriacientifica($data) {
        try {
            $categoriacientifica = Doctrine_Core::getTable('Categoriacientifica')->find($data->idcategoriacientifica);
            $categoriacientifica->nombre = $data->nombre;
            if (isset($data->fecha)) {
                $tem_date = explode('T', $data->fecha);
                $categoriacientifica->fecha = $tem_date[0];
            }
            $categoriacientifica->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delCategoriacientifica($data) {
        try {
            $categoriacientifica = Doctrine_Core::getTable('Categoriacientifica')->find($data->idcategoriacientifica);
            $categoriacientifica->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
