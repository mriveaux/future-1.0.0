<?php

class RolesFunctRecurso extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.roles_funct_recurso');
        $this->hasColumn('idrolesfunctrecurso', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'seguridad.roles_funct_recurso_idrolesfunctrecurso'));
        $this->hasColumn('idrolesfunct', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idrecurso', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function __construct() {
        parent::__construct();
    }

    public function loadDataRecursoByRolFuncionalidad($argIdRolesFunct, $argIdFunct) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SELECT = "dr.*, (SELECT true FROM configuracion.dat_recurso dr1 INNER JOIN seguridad.roles_funct_recurso rfr ON (dr1.idrecurso = rfr.idrecurso) WHERE dr.idrecurso = dr1.idrecurso AND rfr.idrolesfunct = '$argIdRolesFunct') as asociado";
            $ORDER_BY = "ORDER BY dr.nombre";
            $SQL = "SELECT $SELECT FROM configuracion.dat_recurso dr WHERE dr.idfuncionalidad = '$argIdFunct' $ORDER_BY";
            return $cc->fetchAll($SQL);
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function deleteAssociation($agIdRolesfunct) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SQL = "DELETE FROM seguridad.roles_funct_recurso rfr WHERE rfr.idrolesfunct = '$agIdRolesfunct'";
            return $cc->fetchAll($SQL);
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

}
