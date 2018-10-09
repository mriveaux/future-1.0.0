<?php

class UraModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addUra($data) {
        try {
            $ura = new Ura();
            if ($ura->getUraNombre($data->ura, $data->identidad) == 0) {
                $ura->ura = $data->ura;
                $ura->identidad = $data->identidad;
                $ura->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe para el centro
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modUra($data) {
        try {
            $ura = new Ura();
            if ($ura->getUraNombre($data->ura, $data->identidad, $data->idura) == 0) {
                $ura = Doctrine_Core::getTable('Ura')->find($data->idura);
                $ura->ura = $data->ura;
                $ura->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe para el centro
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delUra($data) {
        try {
            $ura = Doctrine_Core::getTable('Ura')->find($data->idura);
            if ($ura->delete())
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
