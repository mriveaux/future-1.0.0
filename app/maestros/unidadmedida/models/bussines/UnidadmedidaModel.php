<?php

class UnidadmedidaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addUnidadMedida($data) {
        try {
            $unidadmedida = new Unidadmedida();
            if ($unidadmedida->buscarUnidadmedida($data->nombre) == 0) {
                $unidadmedida->nombre = $data->nombre;
                $unidadmedida->abreviatura = $data->abreviatura;
                $unidadmedida->save();
                return 0;
            } else {
                return 1;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modUnidadMedida($data) {
        try {
            $unidadmedida = new Unidadmedida();
            if ($unidadmedida->buscarUnidadmedida($data->idunidadmedida) == 0) {
                $unidadmedida = Doctrine::getTable('Unidadmedida')->find($data->idunidadmedida);
                $unidadmedida->nombre = $data->nombre;
                $unidadmedida->abreviatura = $data->abreviatura;
                $unidadmedida->save();
                return 0;
            } else {
                return 1;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delUnidadMedida($data) {
        try {
            $unidadmedida = new Unidadmedida();
            if ($unidadmedida->unidadMedidaEnUso($data->idunidadmedida) == 0) {
                $objUnidad = Doctrine::getTable('Unidadmedida')->find($data->idunidadmedida);
                $objUnidad->delete();
                return 0;
            } else {
                return 1;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
