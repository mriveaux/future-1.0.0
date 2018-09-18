<?php

class Contacto extends Doctrine_Record {

    public function setUp() {
        parent :: setUp();
        $this->hasOne('Sociocomercial', array('local' => 'idsociocomercial', 'foreign' => 'idsociocomercial'));
    }

    public function setTableDefinition() {
        $this->setTableName('comercial.nom_contacto');
        $this->hasColumn('idcontacto', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'comercial.nom_contacto_idcontacto'));
        $this->hasColumn('cargo', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('foto', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('email', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('telefono', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('movil', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('direccionempresa', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpais', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('provincia', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('direccionpersonal', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('codpostal', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idsociocomercial', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('ci', 'character varying', null, array('notnull' => true, 'primary' => false));
    }

    public function persist() {
        try {

            $this->save();

            return $this->idcontacto;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    static public function GetAll() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Contacto')->execute();
            return $result->toArray();
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByPage($offset, $limit, $toArray = false) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Contacto')
                    ->offset($offset)
                    ->limit($limit)
                    ->execute();
            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetById($idcontacto, $toArray = false) {
        try {
            $result = Doctrine::getTable('Contacto')->find($idcontacto);
            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByIds($arrIds, $toArray = false) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Contacto')
                    ->whereIn("idcontacto", $arrIds)
                    ->execute();
            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByCondition($condition, $params, $toArray = false) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Contacto')
                    ->where("$condition", $params)
                    ->execute();
            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function Erase($idcontacto) {
        try {
            $query = Doctrine_Query::create();
            $rows_afected = $query->delete('Contacto')
                    ->where("idcontacto=?", array($idcontacto))
                    ->execute();
            return $rows_afected > 0;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function EraseSQL($idcontacto) {
        try {
            $objDoctrine = Doctrine_Manager::getInstance();
            $connection = $objDoctrine->getCurrentConnection();
            $connection->execute('DELETE FROM comercial.nom_contacto WHERE idcontacto = ' . $idcontacto);
        } catch (Doctrine_Exception $e) {
            if ($e->getCode() == 23503) {//Code for foreignKeyViolation
                return -1;
            } else {
                return $e->getMessage();
            }
        }
    }

    static public function EraseByCondition($conditions, $params) {
        try {
            $query = Doctrine_Query::create();
            $rows_afected = $query->delete('Contacto')
                    ->where("$conditions", $params)
                    ->execute();
            return $rows_afected > 0;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function EraseByConditionSQL($conditions) {
        try {
            $objDoctrine = Doctrine_Manager::getInstance();
            $connection = $objDoctrine->getCurrentConnection();
            $connection->execute('DELETE FROM comercial.nom_contacto WHERE ' . $conditions);
            return TRUE;
        } catch (Doctrine_Exception $e) {
            if ($e->getCode() == 23503) {//Code for foreignKeyViolation
                return 0;
            } else {
                return $e->getMessage();
            }
        }
    }

}
