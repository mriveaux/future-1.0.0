<?php

class TerritorioModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTerritorio($data) {
        try {
            $territorio = new Territorio();
            $territorio->codigo = $data->codigo;
            $territorio->abreviatura = $data->abreviatura;
            $territorio->nombre = $data->nombre;
            $territorio->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTerritorio($data) {
        try {
            $territorio = Doctrine_Core::getTable('Territorio')->find($data->idterritorio);
            $territorio->codigo = $data->codigo;
            $territorio->abreviatura = $data->abreviatura;
            $territorio->nombre = $data->nombre;
            $territorio->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTerritorio($data) {
        try {
            $territorio = Doctrine_Core::getTable('Territorio')->find($data->idterritorio);
            $territorio->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
