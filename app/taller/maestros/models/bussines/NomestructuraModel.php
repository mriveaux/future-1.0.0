<?php

class NomestructuraModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function Adicionar($data) {
        try {
            $objNomestructura = new Nomestructura();
            if ($objNomestructura->buscarEstructura($data->nombre, $data->abreviatura) == 0) {
                $obj = new Nomestructura();
                $obj->nombre = $data->nombre;
                $obj->abreviatura = $data->abreviatura;
                $obj->descripcion = $data->descripcion;
                $obj->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Modificar($data) {
        try {
            $objNomestructura = new Nomestructura();
            if ($objNomestructura->buscarEstructura($data->nombre, $data->abreviatura, $data->idestructura) == 0) {
                $obj = Doctrine::getTable('Nomestructura')->find($data->idestructura);
                $obj->nombre = $data->nombre;
                $obj->abreviatura = $data->abreviatura;
                $obj->descripcion = $data->descripcion;
                $obj->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe la estructura
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Eliminar($data) {
        try {
            $obj = Doctrine::getTable('Nomestructura')->find($data->idestructura);
            if ($obj->delete()) {
                return 1; //elimino
            } else {
                return 2; //tiene datos asociados
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
