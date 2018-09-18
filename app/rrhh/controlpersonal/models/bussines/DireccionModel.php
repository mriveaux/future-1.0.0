<?php

class DireccionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addDireccion($data) {
        try {
            $direccion = new Direccion();
            $direccion->nombre = $data->nombre;
            $direccion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modDireccion($data) {
        try {
            $direccion = Doctrine_Core::getTable('Direccion')->find($data->iddireccion);
            $direccion->nombre = $data->nombre;
            $direccion->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delDireccion($data) {
        try {
            $direccion = Doctrine_Core::getTable('Direccion')->find($data->iddireccion);
            $direccion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
