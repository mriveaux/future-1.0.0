<?php

class SectorModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addSector($data) {
        try {
            $sector = new Sector();
            if ($sector->buscarNombreSector($data->abreviatura, $data->nombre) == 0) {
                $sector->abreviatura = $data->abreviatura;
                $sector->nombre = $data->nombre;
                $sector->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modSector($data) {
        try {
            $sector = new Sector();
            if ($sector->buscarNombreSector($data->abreviatura, $data->nombre, $data->idsector) == 0) {
                $sector = Doctrine_Core::getTable('Sector')->find($data->idsector);
                $sector->abreviatura = $data->abreviatura;
                $sector->nombre = $data->nombre;
                $sector->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delSector($data) {
        try {
            $sector = Doctrine_Core::getTable('Sector')->find($data->idsector);
            if ($sector->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
