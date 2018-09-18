<?php

class ProcedenciaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addProcedencia($data) {
        try {
            $procedencia = new Procedencia();
            $procedencia->nombre = $data->nombre;
            $procedencia->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modProcedencia($data) {
        try {
            $procedencia = Doctrine_Core::getTable('Procedencia')->find($data->idprocedencia);
            $procedencia->nombre = $data->nombre;
            $procedencia->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delProcedencia($data) {
        try {
            $procedencia = Doctrine_Core::getTable('Procedencia')->find($data->idprocedencia);
            $procedencia->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
