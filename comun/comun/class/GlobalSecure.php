<?php


class GlobalSecure {

    private static $instance;

    public function __construct() {
        $this->_integrator = Integrator::getInstance();
    }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function __get($name) {
        return $this->getGlobal($name);
    }

    public function getGlobal($name) {
        $nameService = strtolower($name);
        switch ($nameService) {
            case 'ejercicio':
                $this->_integrator->setModels('maestros', 'NomEjercicio');
                $objEjercicio = new Ejercicio();
                $resultServ = $objEjercicio->getLastEjercicio();
                return $resultServ;
            case 'periodo':
                $this->_integrator->setModels('maestros', 'NomEjercicio');
                $objPeriodo = new Periodo();
                $resultServ = array();
                return $resultServ;
            case 'fecha':
                $this->_integrator->setModels('maestros', 'NomEjercicio');
//                $objFecha = new Fecha();
                $resultServ = array();
                return $resultServ;
            case 'perfil':
                $resultServ = array();
                return $resultServ;
            case 'modulo':
                $this->_integrator->setModels('configuracion', 'Modulos');
                $objModulos = new Modulos();
                $resultServ = array();
                return $resultServ;
            case 'moneda':
                $this->_integrator->setModels('maestros', 'NomMoneda');
//                $objFecha = new NomMoneda();
                $resultServ = array();
                return $resultServ;
            default:
                throw new Exception("The given service don't exists or not yet implemented.");
        }
    }

}
