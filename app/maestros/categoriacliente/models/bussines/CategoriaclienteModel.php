<?php

class CategoriaclienteModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCategoriacliente($data) {
        try {
            $categoriacliente = new Categoriacliente();
            if ($categoriacliente->buscarNombreCategoriacliente($data->abreviatura, $data->nombre) == 0) {
                $categoriacliente->abreviatura = $data->abreviatura;
                $categoriacliente->nombre = $data->nombre;
                $categoriacliente->idsector = $data->idsector;
                $categoriacliente->idtiposervicio = $data->idtiposervicio;
                $categoriacliente->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modCategoriacliente($data) {
        try {
            $categoriacliente = new Categoriacliente();
            if ($categoriacliente->buscarNombreCategoriacliente($data->abreviatura, $data->nombre, $data->idcategoriacliente) == 0) {
                $categoriacliente = Doctrine_Core::getTable('Categoriacliente')->find($data->idcategoriacliente);
                $categoriacliente->abreviatura = $data->abreviatura;
                $categoriacliente->nombre = $data->nombre;
                $categoriacliente->idsector = $data->idsector;
                $categoriacliente->idtiposervicio = $data->idtiposervicio;
                $categoriacliente->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delCategoriacliente($data) {
        try {
            $categoriacliente = Doctrine_Core::getTable('Categoriacliente')->find($data->idcategoriacliente);
            if ($categoriacliente->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
