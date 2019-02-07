<?php

class VehiculoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addVehiculo($data) {
        try {
            $vehiculo = new Vehiculo();
            $vehiculo->idpersona = $data->idpersona;
            $vehiculo->idvehiculo = $data->idvehiculo;
            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $vehiculo->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $vehiculo->fechavencimiento = $tem_date[0];
            }
            $vehiculo->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modVehiculo($data) {
        try {
            $vehiculo = Doctrine_Core::getTable('Vehiculo')->find($data->id);
            $vehiculo->idpersona = $data->idpersona;
            $vehiculo->idvehiculo = $data->idvehiculo;

            if (isset($data->fechaexpedido)) {
                $tem_date = explode('T', $data->fechaexpedido);
                $vehiculo->fechaexpedido = $tem_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tem_date = explode('T', $data->fechavencimiento);
                $vehiculo->fechavencimiento = $tem_date[0];
            }
            $vehiculo->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delVehiculo($id) {
        try {
            $vehiculo = Doctrine_Core::getTable('Vehiculo')->find($id);
            $vehiculo->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}