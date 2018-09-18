<?php

class GruposanguineoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addGruposanguineo($data) {
        try {
            $gruposanguineo = new Gruposanguineo();
            $gruposanguineo->nombre = $data->nombre;
            $gruposanguineo->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modGruposanguineo($data) {
        try {
            $gruposanguineo = Doctrine_Core::getTable('Gruposanguineo')->find($data->idgruposanguineo);
            $gruposanguineo->nombre = $data->nombre;
            $gruposanguineo->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delGruposanguineo($data) {
        try {
            $gruposanguineo = Doctrine_Core::getTable('Gruposanguineo')->find($data->idgruposanguineo);
            $gruposanguineo->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
