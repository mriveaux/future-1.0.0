<?php

class CodmercadologicoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCodmercadologico($data) {
        try {
            $codmercadologico = new Codmercadologico();
            if ($codmercadologico->buscarNombreCodmercadologico($data->abreviatura, $data->nombre) == 0) {
                $codmercadologico->abreviatura = $data->abreviatura;
                $codmercadologico->nombre = $data->nombre;
                $codmercadologico->idcategoria = $data->idcategoria;
                $codmercadologico->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modCodmercadologico($data) {
        try {
            $codmercadologico = new Codmercadologico();
            if ($codmercadologico->buscarNombreCodmercadologico($data->abreviatura, $data->nombre, $data->idcodmercadologico) == 0) {
                $codmercadologico = Doctrine_Core::getTable('Codmercadologico')->find($data->idcodmercadologico);
                $codmercadologico->abreviatura = $data->abreviatura;
                $codmercadologico->nombre = $data->nombre;
                $codmercadologico->idcategoria = $data->idcategoria;
                $codmercadologico->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delCodmercadologico($data) {
        try {
            $codmercadologico = Doctrine_Core::getTable('Codmercadologico')->find($data->idcodmercadologico);
            if ($codmercadologico->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
