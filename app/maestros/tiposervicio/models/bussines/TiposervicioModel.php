<?php

class TiposervicioModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTiposervicio($data) {
        try {
            $tiposervicio = new Tiposervicio();
            if ($tiposervicio->buscarNombreTiposervicio($data->abreviatura, $data->nombre) == 0) {
                $tiposervicio->abreviatura = $data->abreviatura;
                $tiposervicio->nombre = $data->nombre;
                $tiposervicio->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modTiposervicio($data) {
        try {
            $tiposervicio = new Tiposervicio();
            if ($tiposervicio->buscarNombreTiposervicio($data->abreviatura, $data->nombre, $data->idtiposervicio) == 0) {
                $tiposervicio = Doctrine_Core::getTable('Tiposervicio')->find($data->idtiposervicio);
                $tiposervicio->abreviatura = $data->abreviatura;
                $tiposervicio->nombre = $data->nombre;
                $tiposervicio->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delTiposervicio($data) {
        try {
            $tiposervicio = Doctrine_Core::getTable('Tiposervicio')->find($data->idtiposervicio);
            if ($tiposervicio->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
