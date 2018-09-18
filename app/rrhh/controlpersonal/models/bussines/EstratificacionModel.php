<?php

class EstratificacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addEstratificacion($data) {
        try {
            $estratificacion = new Estratificacion();
            $estratificacion->nombre = $data->nombre;
            $estratificacion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modEstratificacion($data) {
        try {
            $estratificacion = Doctrine_Core::getTable('Estratificacion')->find($data->idestratificacion);
            $estratificacion->nombre = $data->nombre;
            $estratificacion->save();
            return "{'success':true, 'codMsg':1, 'message': 'La estratificaci&oacute;n social fue modificada correctamente.'}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delEstratificacion($data) {
        try {
            $estratificacion = Doctrine_Core::getTable('Estratificacion')->find($data->idestratificacion);
            $estratificacion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
