<?php

class SuperacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addSuperacion($data) {
        try {
            $superacion = new Superacion();
            $superacion->idpersona = $data->idpersona;
            $superacion->tipocurso = $data->tipocurso;
            $superacion->nombrecurso = $data->nombrecurso;
            $superacion->centroestudio = $data->centroestudio;
            $superacion->evaluacion = $data->evaluacion;
            if (isset($data->desde)) {
                $tem_date = explode('T', $data->desde);
                $superacion->desde = $tem_date[0];
            }
            if (isset($data->hasta)) {
                $tem_date = explode('T', $data->hasta);
                $superacion->hasta = $tem_date[0];
            }
            $superacion->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modSuperacion($data) {
        try {
            $superacion = Doctrine_Core::getTable('Superacion')->find($data->idsuperacion);
            $superacion->tipocurso = $data->tipocurso;
            $superacion->nombrecurso = $data->nombrecurso;
            $superacion->centroestudio = $data->centroestudio;
            $superacion->evaluacion = $data->evaluacion;
            if (isset($data->desde)) {
                $tem_date = explode('T', $data->desde);
                $superacion->desde = $tem_date[0];
            }
            if (isset($data->hasta)) {
                $tem_date = explode('T', $data->hasta);
                $superacion->hasta = $tem_date[0];
            }
            $superacion->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delSuperacion($data) {
        try {
            $superacion = Doctrine_Core::getTable('Superacion')->find($data->idsuperacion);
            $superacion->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
