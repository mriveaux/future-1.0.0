<?php

class ZonaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addZona($data) {
        try {
            $zona = new Zona();
            if ($zona->getZonaNombre($data->zona, $data->identidad) == 0) {
                $zona->zona = $data->zona;
                $zona->identidad = $data->identidad;
                $zona->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe para el centro
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modZona($data) {
        try {
            $zona = new Zona();
            if ($zona->getZonaNombre($data->zona, $data->identidad, $data->idzona) == 0) {
                $zona = Doctrine_Core::getTable('Zona')->find($data->idzona);
                $zona->zona = $data->zona;
                $zona->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe para el centro
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delZona($data) {
        try {
            $zona = Doctrine_Core::getTable('Zona')->find($data->idzona);
            if ($zona->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            else
                return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function loadDataCentrosAtencionSubordinados() {
        try {
            $objEnt = new Entidades();
            return $objEnt->loadDataEntidadesSubordinadasService($this->dataSession->datiduser);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
