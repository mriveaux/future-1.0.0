<?php

class TipopreparacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTipopreparacion($data) {
        try {
            $tipopreparacion = new Tipopreparacion();
            $tipopreparacion->nombre = $data->nombre;
            $tipopreparacion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTipopreparacion($data) {
        try {
            $tipopreparacion = Doctrine_Core::getTable('Tipopreparacion')->find($data->idtipopreparacion);
            $tipopreparacion->nombre = $data->nombre;
            $tipopreparacion->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTipopreparacion($data) {
        try {
            $tipopreparacion = Doctrine_Core::getTable('Tipopreparacion')->find($data->idtipopreparacion);
            $tipopreparacion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
