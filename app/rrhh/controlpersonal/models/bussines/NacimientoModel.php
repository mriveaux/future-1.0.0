<?php

class NacimientoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addNacimiento($data) {
        try {
            $nacimiento = new Nacimiento();
            $nacimiento->idpersona = $data->idpersona;
            $nacimiento->nombremadre = $data->nombremadre;
            $nacimiento->nombrepadre = $data->nombrepadre;
            $nacimiento->registrocivil = $data->registrocivil;
            $nacimiento->tomo = $data->tomo;
            $nacimiento->folio = $data->folio;
            $nacimiento->fechanacimiento = $data->fechanacimiento;
            $nacimiento->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modNacimiento($data) {
        try {
            $nacimiento = Doctrine_Core::getTable('Nacimiento')->find($data->idnacimiento);
            $nacimiento->nombremadre = $data->nombremadre;
            $nacimiento->nombrepadre = $data->nombrepadre;
            $nacimiento->registrocivil = $data->registrocivil;
            $nacimiento->tomo = $data->tomo;
            $nacimiento->folio = $data->folio;
            $nacimiento->fechanacimiento = $data->fechanacimiento;
            $nacimiento->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delNacimiento($data) {
        try {
            $nacimiento = Doctrine_Core::getTable('Nacimiento')->find($data->idnacimiento);
            $nacimiento->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
