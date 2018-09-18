<?php

class GrupoexplotacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addGrupoexplotacion($data) {
        try {
            $objGrupoexplotacion = new Grupoexplotacion();
            if ($objGrupoexplotacion->getGrupoByNombre($data->nombre) == 0) {
                $obj = new Grupoexplotacion();
                $obj->nombre = $data->nombre;
                $obj->km = $data->km;
                $obj->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modGrupoexplotacion($data) {
        try {
            $objGrupoexplotacion = new Grupoexplotacion();
            if ($objGrupoexplotacion->getGrupoByNombre($data->nombre, $data->idgrupoexplotacion) == 0) {
                $obj = Doctrine_Core::getTable('Grupoexplotacion')->find($data->idgrupoexplotacion);
                $obj->nombre = $data->nombre;
                $obj->km = $data->km;
                $obj->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delGrupoexplotacion($idgrupo) {
        try {
            $obj = Doctrine_Core::getTable('Grupoexplotacion')->find($idgrupo);
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
