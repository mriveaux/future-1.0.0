<?php

class CiudadaniaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCiudadania($data) {
        try {
            $ciudadania = new Ciudadania();
            $ciudadania->idpersona = $data->idpersona;
            if (is_int($data->idpais))
                $ciudadania->idpais = $data->idpais;
            if (isset($data->fecha)) {
                $tem_date = explode('T', $data->fecha);
                $ciudadania->fecha = $tem_date[0];
            }
            $ciudadania->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modCiudadania($data) {
        try {
            $ciudadania = Doctrine_Core::getTable('Ciudadania')->find($data->idciudadania);
            if (is_int($data->idpais))
                $ciudadania->idpais = $data->idpais;
            if (isset($data->fecha)) {
                $tem_date = explode('T', $data->fecha);
                $ciudadania->fecha = $tem_date[0];
            }
            $ciudadania->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delCiudadania($data) {
        try {
            $ciudadania = Doctrine_Core::getTable('Ciudadania')->find($data->idciudadania);
            $ciudadania->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
