<?php

class PaisModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addPais($data) {
        try {
            $objPais = new Pais();
            $objPais->codigo = $data->codigo;
            $objPais->siglas = $data->siglas;
            $objPais->pais = $data->pais;
            $objPais->nacionalidad = $data->nacionalidad;
            $objPais->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modPais($data) {
        try {
            $pais = Doctrine_Core::getTable('Pais')->find($data->idpais);
            $pais->codigo = $data->codigo;
            $pais->siglas = $data->siglas;
            $pais->pais = $data->pais;
            $pais->nacionalidad = $data->nacionalidad;
            $pais->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delPais($data) {
        try {
            $pais = Doctrine_Core::getTable('Pais')->find($data->idpais);
            $pais->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function getPaisDpa($data) {
        try {
            $objPais = new Pais();
            $result = $objPais->getPaisConfDpa($data);
            return array('data' => $result);
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        }
    }

    public function getTiposDpa() {
        try {
            $sql = "SELECT t.idtipodpa, t.denominacion FROM maestros.nom_tipodpa t WHERE t.fin ISNULL;";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return array('data' => $result);
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        }
    }

    public function addTipoDpaPais($data) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $objPaisDpa = new Paisdpa();
            $objPaisDpa->idpais = $data->idpais;
            $objPaisDpa->idtipodpa = $data->idtipodpa;
            $objPaisDpa->leaf = true; //true significa que es hijo
            $objPaisDpa->idpadre = $data->idpadre;
            $objPaisDpa->save();
            //se pone como padre a la entidad padre
            if (isset($data->idpadre) && strlen($data->idpadre) > 0) {
                $objPaisDpaPadre = Doctrine_Core::getTable('Paisdpa')->find($data->idpadre);
                //si su padre era una hoja, se pone como padre
                if ($objPaisDpaPadre) {
                    $objPaisDpaPadre->leaf = false; //false significa que no es hoja
                    $objPaisDpaPadre->save();
                }
            }
            $cc->commit();
            return 1;
        } catch (Doctrine_Exception $dexc) {
            $cc->rollback();
            throw $dexc;
        }
    }

    public function delTipoDpaPais($data) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $recordPaisDpa = Doctrine_Core::getTable('Paisdpa')->find($data->id);
            $objPaisDpa = new Paisdpa();
            $countLeaves = $objPaisDpa->countLeaves($recordPaisDpa->idpais, $recordPaisDpa->idpadre,$recordPaisDpa->idtipodpa);
            if ($countLeaves == 0) {
                $objPaisDpaPadre = Doctrine_Core::getTable('Paisdpa')->find($recordPaisDpa->idpadre);
                $objPaisDpaPadre->leaf = true;
                $objPaisDpaPadre->save();
            }
            $recordPaisDpa->delete();
            $cc->commit();
            return 1;
        } catch (Doctrine_Exception $dexc) {
            $cc->rollback();
            throw $dexc;
        }
    }

    public function getDataRpt($data) {
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'DM001';
        $datoGeneral->titulo = 'Listado_paises';
        $datoGeneral->entidad = $this->dataSession->desc_entidad;
        $objPais = new Pais();
        $result = $objPais->getListPaisesService($data);
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $result);
    }

}
