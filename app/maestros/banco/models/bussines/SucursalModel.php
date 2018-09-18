<?php

class SucursalModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addSucursal($data) {
        try {
            $sucursal = new Sucursal();
            $sucursal->idbanco = $data->idbanco;
            $sucursal->numero = $data->numero;
            $sucursal->direccion = $data->direccion;
            $sucursal->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }
    
    public function modSucursal($data) {
        try {
            $sucursal = Doctrine_Core::getTable('Sucursal')->find($data->idsucursal);
            $sucursal->idbanco = $data->idbanco;
            $sucursal->numero = $data->numero;
            $sucursal->direccion = $data->direccion;
            $sucursal->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delSucursal($data) {
        try {
            $sucursal = Doctrine_Core::getTable('Sucursal')->find($data->idsucursal);
            $sucursal->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
