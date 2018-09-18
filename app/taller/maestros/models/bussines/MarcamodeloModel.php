<?php

class MarcamodeloModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addMarcamodelo($data) {
        try {
            $obj_marcamodelo = new Marcamodelo();
            if ($obj_marcamodelo->getMarcamodeloByNombre($data->nombre) == 0) {
                $obj_marcamodelo->nombre = $data->nombre;
                $obj_marcamodelo->tipocombustible = $data->tipocomb;
                $obj_marcamodelo->normaconsumo = $data->norma;
                $obj_marcamodelo->idtipovehiculo = $data->idtipovehiculo;
                $obj_marcamodelo->periodomantenimiento = $data->periodomnto;
                $obj_marcamodelo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modMarcamodelo($data) {
        try {
            $obj_marcamodelo = new Marcamodelo();
            if ($obj_marcamodelo->getMarcamodeloByNombre($data->nombre, $data->idmarcamodelo) == 0) {
                $obj_marcamodelo = Doctrine_Core::getTable('Marcamodelo')->find($data->idmarcamodelo);
                $obj_marcamodelo->nombre = $data->nombre;
                $obj_marcamodelo->tipocombustible = $data->tipocomb;
                $obj_marcamodelo->normaconsumo = $data->norma;
                if (is_numeric($data->idtipovehiculo))
                    $obj_marcamodelo->idtipovehiculo = $data->idtipovehiculo;
                $obj_marcamodelo->periodomantenimiento = $data->periodomnto;
                $obj_marcamodelo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delMarcamodelo($id) {
        try {
            $obj = Doctrine::getTable('Marcamodelo')->find($id);
            if ($obj->delete()) {
                return 1; //elimino
            } else {
                return 2; //tiene datos asociados
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function getTipovehiculo() {
        try {
            $obj_Tipovehiculo = new Tipovehiculo();
            return array('data' => $obj_Tipovehiculo->getAllTipovehiculoService());
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
