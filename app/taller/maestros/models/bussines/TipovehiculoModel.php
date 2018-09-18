<?php

class TipovehiculoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTipovehiculo($data) {
        try {
            $obj_tipovehiculo = new Tipovehiculo();
            if ($obj_tipovehiculo->getTipovehiculoByNombre($data->nombre) == 0) {
                $obj_tipovehiculo->idtipovehiculo = $data->idtipovehiculo;
                $obj_tipovehiculo->nombre = $data->nombre;
                $obj_tipovehiculo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTipovehiculo($data) {
        try {
            $obj_tipovehiculo = new Tipovehiculo();
            if ($obj_tipovehiculo->getTipovehiculoByNombre($data->nombre, $data->idtipovehiculo) == 0) {
                $obj_tipovehiculo = Doctrine_Core::getTable('Tipovehiculo')->find($data->idtipovehiculo);
                $obj_tipovehiculo->nombre = $data->nombre;
                $obj_tipovehiculo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTipovehiculo($id) {
        try {
            $obj = Doctrine::getTable('Tipovehiculo')->find($id);
            if ($obj->delete()) {
                return 1; //elimino
            } else {
                return 2; //tiene datos asociados
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
