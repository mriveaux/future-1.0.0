<?php

class Sociocomercial extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Sociocomercial', array('local' => 'idempresa', 'foreign' => 'id'));
        $this->hasMany('Sociocomercial', array('local' => 'id', 'foreign' => 'idempresa'));
        $this->hasMany('Contacto', array('local' => 'id', 'foreign' => 'idsociocomercial'));
    }

    public function setTableDefinition() {
        $this->setTableName('comercial.nom_sociocomercial');
        $this->hasColumn('id', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'comercial.sociocomercial_id'));
        $this->hasColumn('codigo', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('tipo', 'numeric', 1, array('notnull' => false, 'primary' => false));
        $this->hasColumn('telefono', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('provincia', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('codpostal', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('sitioweb', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('movil', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fax', 'character varying', null, array('notnull' => true, 'primary' => false));
       $this->hasColumn('idcuentacobrar', 'numeric', 19, array('notnull' => true, 'primary' => false));
       $this->hasColumn('idcuentapagar', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('creditoconcedido', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idempresa', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('foto', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('ci', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('email', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('isempresa', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function persist() {
        try {
//            $a = Doctrine_Manager::getInstance();
//            $va = $a->getCurrentConnection();

            $this->save();
//
//            $va->commit();
//            $va->beginTransaction();

            return $this->id;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    static public function GetAll() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Sociocomercial')->execute();

            return $result->toArray();
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByPage($offset, $limit, $toArray = FALSE) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Sociocomercial')
                    ->offset($offset)
                    ->limit($limit)
                    ->execute();

            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetById($idsociocomercial, $toArray = FALSE) {
        try {
            $result = Doctrine::getTable('Sociocomercial')->find($idsociocomercial);

            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByIds($arrIds, $toArray = FALSE) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Sociocomercial')
                    ->whereIn('id', $arrIds)
                    ->execute();

            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    static public function GetByCondition($condition, $params, $toArray = FALSE) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->from('Sociocomercial')
                    ->where("$condition", $params)
                    ->execute();

            return $toArray ? $result->toArray() : $result;
        } catch (Doctrine_Exception $e) {
            return $e;
        }
    }

    /**
     * @param $conditions
     * @return array
     */
    static public function GetByConditionSQL($conditions) {
        $select = 'cp.*, (CASE WHEN cp.idempresa IS NOT NULL THEN
	                (SELECT e.nombre FROM comercial.nom_sociocomercial e WHERE cp.idempresa = e.id)
	                ELSE null END) as empresa'
//                . ', (CASE WHEN cp.idcuentacobrar IS NOT NULL THEN
//	                (SELECT nc.concatcta ||\' \'|| nc.denominacion FROM mod_contabilidad.nom_cuenta nc WHERE nc.idcuenta = cp.idcuentacobrar)
//	                ELSE null END) as cuentacobrar'
//                . ', (CASE WHEN cp.idcuentapagar IS NOT NULL THEN
//	                (SELECT nc1.concatcta ||\' \'|| nc1.denominacion FROM mod_contabilidad.nom_cuenta nc1 WHERE nc1.idcuenta = cp.idcuentapagar)
//	                ELSE null END) as cuentapagar'
                . ', (CASE WHEN cp.idpais IS NOT NULL THEN
	                (SELECT np.pais ||\' (\'|| np.siglas ||\')\' FROM maestros.nom_pais np WHERE cp.idpais = np.idpais)
	                ELSE \' \' END) as pais';

        try {
            $objDoctrine = Doctrine_Manager::getInstance();
            $connection = $objDoctrine->getCurrentConnection();
            $data_return = $connection->fetchAll('SELECT ' . $select . ' FROM comercial.nom_sociocomercial cp '
                    . "WHERE $conditions ORDER BY cp.nombre ASC;");
        } catch (Doctrine_Exception $e) {
            throw $e;
        }

        return $data_return;
    }

    static public function Erase($idsociocomercial) {
        try {
            $query = Doctrine_Query::create();
            $rows_afected = $query->delete('Sociocomercial')
                    ->where("id = $idsociocomercial")
                    ->execute();

            return $rows_afected > 0;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    static public function EraseSQL($idsociocomercial) {
        try {
            $objDoctrine = Doctrine_Manager::getInstance();
            $connection = $objDoctrine->getCurrentConnection();
            $connection->execute('DELETE FROM comercial.nom_sociocomercial WHERE id = ' . $idsociocomercial);
            return TRUE;
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
            $rows_afected = $query->delete('Sociocomercial')
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
            $connection->execute('DELETE FROM comercial.nom_sociocomercial WHERE ' . $conditions);
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
