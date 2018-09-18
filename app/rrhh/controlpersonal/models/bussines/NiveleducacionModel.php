<?php

class NiveleducacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addNiveleducacion($data) {
        try {
            $niveleducacion = new Niveleducacion();
            $niveleducacion->nombre = $data->nombre;
            $niveleducacion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modNiveleducacion($data) {
        try {
            $niveleducacion = Doctrine_Core::getTable('Niveleducacion')->find($data->idniveleducacion);
            $niveleducacion->nombre = $data->nombre;
            $niveleducacion->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delNiveleducacion($data) {
        try {
            $niveleducacion = Doctrine_Core::getTable('Niveleducacion')->find($data->idniveleducacion);
            $niveleducacion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
