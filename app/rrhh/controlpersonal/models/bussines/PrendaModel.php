<?php

class PrendaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addPrenda($data) {
        try {
            $prenda = new Prenda();
            $prenda->nombre = $data->nombre;
            $prenda->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modPrenda($data) {
        try {
            $prenda = Doctrine_Core::getTable('Prenda')->find($data->idprenda);
            $prenda->nombre = $data->nombre;
            $prenda->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delPrenda($data) {
        try {
            $prenda = Doctrine_Core::getTable('Prenda')->find($data->idprenda);
            $prenda->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
