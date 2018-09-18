<?php

class DpaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addDpa($data) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $objDpa = new Dpa();
            $objDpa->idpais = $data->idpais;
            $objDpa->idtipodpa = $data->idtipodpa;
            $objDpa->codigo = $data->codigo;
            $objDpa->denominacion = $data->text;
            $objDpa->estado = boolval($data->estado);
            $objDpa->leaf = true;
            if (isset($data->idpadre) && strlen($data->idpadre) > 0 && $data->idpadre != 0) {
                $objDpa->idpadre = $data->idpadre;
            }
            $objDpa->save();
            if (isset($data->idpadre) && strlen($data->idpadre) > 0) {
                $objDpaPadre = Doctrine_Core::getTable('Dpa')->find($data->idpadre);
                if ($objDpaPadre) {
                    $objDpaPadre->leaf = false;
                    $objDpaPadre->save();
                }
            }
            $cc->commit();
            return array('success' => true, 'code' => 1, 'msg' => 'futureLang.lbSaveOk');
        } catch (Doctrine_Exception $dexc) {
            $cc->rollback();
            throw $dexc;
        }
    }

    public function modDpa($data) {
       $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $objDpa = Doctrine_Core::getTable('Dpa')->find($data->id);
            $objDpa->idtipodpa = $data->idtipodpa;
            $objDpa->codigo = $data->codigo;
            $objDpa->denominacion = $data->text;
            $objDpa->estado = $data->estado;
            $objDpa->save();
            $cc->commit();
            return array('success' => true, 'code' => 1, 'msg' => 'futureLang.lbSaveOk');
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            throw $e;
        }
    }

    public function delDpa($id) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $dpa = Doctrine_Core::getTable('Dpa')->find($id);
            $dpa->delete();
            $cc->commit();
            return 1;
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            throw $e;
        }
    }

    public function getDpaPais($data) {
        try {
            $objDpa = new Dpa();
            $result = $objDpa->getDpaPais($data);
            return ['data' => $result];
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
