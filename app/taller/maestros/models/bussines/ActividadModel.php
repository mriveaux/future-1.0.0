<?php

class ActividadModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addActividad($data) {
        try {
            $obj = new Actividad();
            if (!$obj->getActividadByNombre($data->nombre)) {
                $obj->nombre = $data->nombre;
                $obj->abreviatura = $data->abreviatura;
                $obj->descripcion = $data->descripcion;
                $obj->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modActividad($data) {
        try {
            $objActividad = new Actividad();
            if (!$objActividad->getActividadByNombre($data->nombre, $data->idactividad)) {
                $obj = Doctrine_Core::getTable('Actividad')->find($data->idactividad);
                $obj->nombre = $data->nombre;
                $obj->abreviatura = $data->abreviatura;
                $obj->descripcion = $data->descripcion;
                $obj->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delActividad($idactividad) {
        try {
            $obj = Doctrine_Core::getTable('Actividad')->find($idactividad);
            if ($obj->delete()) {
                return 1; //elimino
            }
            else
                return 2; //tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
