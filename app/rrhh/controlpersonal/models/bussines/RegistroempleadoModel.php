<?php

class RegistroempleadoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addRegistroempleado($data) {
        try {
            $registroempleado = new Registroempleado();
            $registroempleado->idregistroempleado = $data->idregistroempleado;
            $registroempleado->registroempleado = $data->registroempleado;
            $registroempleado->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modRegistroempleado($data) {
        try {
            $registroempleado = Doctrine_Core::getTable('Registroempleado')->find($data->idregistroempleado);
            $registroempleado->registroempleado = $data->registroempleado;
            $registroempleado->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delRegistroempleado($id) {
        try {
            $registroempleado = Doctrine_Core::getTable('Registroempleado')->find($id);
            $registroempleado->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
