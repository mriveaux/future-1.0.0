<?php

class CompetenciaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCompetencia($data) {
        try {
            $competencia = new Competencia();
            $competencia->idpersona = $data->idpersona;
            $competencia->nombre = $data->nombre;
            $competencia->descripcion = $data->descripcion;
            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $competencia->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $competencia->fechavencimiento = $tem_date[0];
            }
            $competencia->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modCompetencia($data) {
        try {
            $competencia = Doctrine_Core::getTable('Competencia')->find($data->id);
            $competencia->idpersona = $data->idpersona;
            $competencia->nombre = $data->nombre;
            $competencia->descripcion = $data->descripcion;
            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $competencia->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $competencia->fechavencimiento = $tem_date[0];
            }
            $competencia->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delCompetencia($id) {
        try {
            $competencia = Doctrine_Core::getTable('Competencia')->find($id);
            $competencia->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}