<?php

class SeleccionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addSeleccion($data) {
        try {
            $seleccion = new Seleccion();
            $seleccion->idseleccion = $data->idseleccion;
            $seleccion->seleccion = $data->seleccion;
            $seleccion->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modSeleccion($data) {
        try {
            $seleccion = Doctrine_Core::getTable('Seleccion')->find($data->idseleccion);
            $seleccion->seleccion = $data->seleccion;
            $seleccion->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delSeleccion($id) {
        try {
            $seleccion = Doctrine_Core::getTable('Seleccion')->find($id);
            $seleccion->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function getProcesos() {
        $objProc = new Proceso();
        $arg = new stdClass();
        $arg->status = array(0,1);
        return $objProc->getProcesosService($arg);
    }

}
