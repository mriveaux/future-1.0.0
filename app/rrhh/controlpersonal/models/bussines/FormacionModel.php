<?php

class FormacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addFormacion($data) {
        try {
            $formacion = new Formacion();
            $formacion->idpersona = $data->idpersona;
            $formacion->tipoestudio = $data->tipoestudio;
            $formacion->centroestudio = $data->centroestudio;
            $formacion->evaluacion = $data->evaluacion;
            if (isset($data->desde)) {
                $tem_date = explode('T', $data->desde);
                $formacion->desde = $tem_date[0];
            }
            if (isset($data->hasta)) {
                $tem_date = explode('T', $data->hasta);
                $formacion->hasta = $tem_date[0];
            }
            $formacion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modFormacion($data) {
        try {
            $formacion = Doctrine_Core::getTable('Formacion')->find($data->idestudio);
            $formacion->tipoestudio = $data->tipoestudio;
            $formacion->centroestudio = $data->centroestudio;
            $formacion->evaluacion = $data->evaluacion;
            if (isset($data->desde)) {
                $tem_date = explode('T', $data->desde);
                $formacion->desde = $tem_date[0];
            }
            if (isset($data->hasta)) {
                $tem_date = explode('T', $data->hasta);
                $formacion->hasta = $tem_date[0];
            }
            $formacion->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delFormacion($data) {
        try {
            $formacion = Doctrine_Core::getTable('Formacion')->find($data->idestudio);
            $formacion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
