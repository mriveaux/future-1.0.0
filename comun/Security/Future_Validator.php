<?php

class Future_Validator {

    private static $instance;

    public function __construct() {
        
    }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function getDataResources($argSrc, $argIdRoles) {
        return $this->getResourcesByFunctionalitySrc($argSrc, $argIdRoles);
    }

    private function getResourcesByFunctionalitySrc($argSrc, $argIdRoles) {
        try {
            $str_idRoles = implode(',', $argIdRoles);
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SQL = "SELECT dr.* FROM configuracion.funcionalidades f "
                    . "INNER JOIN configuracion.dat_recurso dr ON (f.idfuncionalidades = dr.idfuncionalidad)"
                    . "INNER JOIN seguridad.roles_funct_recurso rfr ON (dr.idrecurso = rfr.idrecurso)"
                    . "INNER JOIN seguridad.roles_funct rf ON (rfr.idrolesfunct = rf.idrolesfunct)"
                    . "AND (f.idfuncionalidades = rf.idfuncionalidades)"
                    . "WHERE f.src = '$argSrc' AND rf.idroles IN ($str_idRoles)";
            return $cc->fetchAll($SQL);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
