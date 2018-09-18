<?php

class CategoriadocModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCategoriadoc($data) {
        try {
            $categoriadoc = new Categoriadoc();
            $categoriadoc->nombre = $data->nombre;
            $categoriadoc->descripcion = $data->descripcion;
            $categoriadoc->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modCategoriadoc($data) {
        try {
            $categoriadoc = Doctrine_Core::getTable('Categoriadoc')->find($data->idcategoriadocidentidad);
            $categoriadoc->nombre = $data->nombre;
            $categoriadoc->descripcion = $data->descripcion;
            $categoriadoc->save();
            return "{'success':true, 'codMsg':1, 'message': 'La categor&iacute;a de documento fue modificada correctamente.'}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delCategoriadoc($data) {
        try {
            $categoriadoc = Doctrine_Core::getTable('Categoriadoc')->find($data->idcategoriadocidentidad);
            $categoriadoc->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
