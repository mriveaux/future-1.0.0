<?php

class CategoriaservicioModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addCategoriaservicio($data) {
        try {
            $categoriaservicio = new Categoriaservicio();
            if ($categoriaservicio->buscarNombreCategoriaservicio($data->abreviatura, $data->nombre) == 0) {
                $categoriaservicio->prioridad = $data->prioridad;
                $categoriaservicio->abreviatura = $data->abreviatura;
                $categoriaservicio->nombre = $data->nombre;
                $categoriaservicio->color = $data->color;
                $categoriaservicio->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modCategoriaservicio($data) {
        try {
            $categoriaservicio = new Categoriaservicio();
            if ($categoriaservicio->buscarNombreCategoriaservicio($data->abreviatura, $data->nombre, $data->idcategoriaservicio) == 0) {
                $categoriaservicio = Doctrine_Core::getTable('Categoriaservicio')->find($data->idcategoriaservicio);
                $categoriaservicio->prioridad = $data->prioridad;
                $categoriaservicio->abreviatura = $data->abreviatura;
                $categoriaservicio->nombre = $data->nombre;
                $categoriaservicio->color = $data->color;
                $categoriaservicio->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delCategoriaservicio($data) {
        try {
            $categoriaservicio = Doctrine_Core::getTable('Categoriaservicio')->find($data->idcategoriaservicio);
            if ($categoriaservicio->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
