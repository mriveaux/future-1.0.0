<?php

class MaestrosModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addMaestros($data) {
        try {
            $maestros = new Maestros();
            $maestros->idmaestros = $data->idmaestros;
            $maestros->maestros = $data->maestros;
            $maestros->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modMaestros($data) {
        try {
            $maestros = Doctrine_Core::getTable('Maestros')->find($data->idmaestros);
            $maestros->maestros = $data->maestros;
            $maestros->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delMaestros($id) {
        try {
            $maestros = Doctrine_Core::getTable('Maestros')->find($id);
            $maestros->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
