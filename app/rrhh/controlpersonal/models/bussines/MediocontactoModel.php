<?php

class MediocontactoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addMediocontacto($data) {
        try {
            $mediocontacto = new Mediocontacto();
            $mediocontacto->nombre = $data->nombre;
            $mediocontacto->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modMediocontacto($data) {
        try {
            $mediocontacto = Doctrine_Core::getTable('Mediocontacto')->find($data->idmediocontacto);
            $mediocontacto->nombre = $data->nombre;
            $mediocontacto->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delMediocontacto($data) {
        try {
            $mediocontacto = Doctrine_Core::getTable('Mediocontacto')->find($data->idmediocontacto);
            $mediocontacto->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
