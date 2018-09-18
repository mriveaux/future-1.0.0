<?php

class OrganoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function Adicionar($data) {
        try {
            $organo = new Organo();
            if ($organo->buscarOrgano($data->nombre) == 0) {
                $organo->nombre = $data->nombre;
                $organo->descripcion = $data->descripcion;
                $organo->identidad = $_SESSION['identidad'];
                $organo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe el organo
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Modificar($data) {
        try {
            $organo = new Organo();
            if ($organo->buscarOrgano($data->nombre, $data->idorgano) == 0) {
                $organo = Doctrine::getTable('Organo')->find($data->idorgano);
                $organo->nombre = $data->nombre;
                $organo->descripcion = $data->descripcion;
                $organo->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe el organo
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Eliminar($data) {
        try {
            $org = Doctrine::getTable('Organo')->find($data->idorgano);
            if ($org->delete()) {
                return 1; //elimino
            }
            else
                return 2; //tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
