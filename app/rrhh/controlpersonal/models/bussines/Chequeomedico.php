<?php

class ChequeomedicoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addChequeomedico($data) {
        try {
            $chequeomedico = new Chequeomedico();
            $chequeomedico->idpersona = $data->idpersona;
            $chequeomedico->lugar = $data->lugar;
            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $chequeomedico->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $chequeomedico->fechavencimiento = $tem_date[0];
            }
            $chequeomedico->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modChequeomedico($data) {
        try {
            $chequeomedico = Doctrine_Core::getTable('Chequeomedico')->find($data->id);
            $chequeomedico->idpersona = $data->idpersona;
            $chequeomedico->lugar = $data->lugar;
            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $chequeomedico->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $chequeomedico->fechavencimiento = $tem_date[0];
            }
            $chequeomedico->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delChequeomedico($id) {
        try {
            $chequeomedico = Doctrine_Core::getTable('Chequeomedico')->find($id);
            $chequeomedico->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}