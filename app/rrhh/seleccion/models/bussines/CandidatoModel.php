<?php

class CandidatoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCandidato($data) {
        try {
            $candidato = new Candidato();
            $candidato->idprocesoseleccion = $data->idprocesoseleccion;
            $candidato->idpersona = $data->idpersona;
            $candidato->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delCandidato($id) {
        try {
            $candidato = Doctrine_Core::getTable('Candidato')->find($id);
            $candidato->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function changeStatusCandidato($data) {
        try {
            $candidato = Doctrine_Core::getTable('Candidato')->find($data->idcandidatoseleccion);
            $candidato->status = $data->status;
            $candidato->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function getPersonasProceso($data) {
        $objPersona = new Registropersona();
        $data->status = array(0);
        return $objPersona->getPersonasByStatusService($data);
    }

}
