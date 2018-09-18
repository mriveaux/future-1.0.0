<?php

class MonedaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addMoneda($data) {
        try {
            $moneda = new Moneda();
            $moneda->codigonum = $data->codigonum;
            $moneda->codigoiso = $data->codigoiso;
            $moneda->moneda = $data->moneda;
            $moneda->pais = $data->pais;
            $moneda->simbolo = $data->simbolo;
            $moneda->presicion = $data->presicion;
            $moneda->factorredondeo = $data->factorredondeo;
            $moneda->idpais = $data->_extraRequest['idpais'];
            $moneda->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modMoneda($data) {
        try {
            
            $moneda = Doctrine_Core::getTable('Moneda')->find($data->idmoneda);
            $moneda->codigonum = $data->codigonum;
            $moneda->codigoiso = $data->codigoiso;
            $moneda->moneda = $data->moneda;
            $moneda->pais = $data->pais;
            $moneda->simbolo = $data->simbolo;
            $moneda->presicion = $data->presicion;
            $moneda->factorredondeo = $data->factorredondeo;
            $moneda->idpais = $data->idpais;
            $moneda->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delMoneda($data) {
        try {
            $moneda = Doctrine_Core::getTable('Moneda')->find($data->idmoneda);
            $moneda->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
