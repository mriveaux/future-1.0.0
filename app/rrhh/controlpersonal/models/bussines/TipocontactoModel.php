<?php

class TipocontactoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTipocontacto($data) {
        try {
            $tipocontacto = new Tipocontacto();
            $tipocontacto->nombre = $data->nombre;
            $tipocontacto->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTipocontacto($data) {
        try {
            $tipocontacto = Doctrine_Core::getTable('Tipocontacto')->find($data->idtipocontacto);
            $tipocontacto->nombre = $data->nombre;
            $tipocontacto->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTipocontacto($data) {
        try {
            $tipocontacto = Doctrine_Core::getTable('Tipocontacto')->find($data->idtipocontacto);
            $tipocontacto->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
