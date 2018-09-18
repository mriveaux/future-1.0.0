<?php

class RegistrovehiculoController extends ControllerSecure {

    private $registrovehiculo;
    private $registrovehiculoModel;

    public function __construct() {
        parent::__construct();
        $this->registrovehiculo = new Registrovehiculo();
        $this->registrovehiculoModel = new RegistrovehiculoModel();
        $this->_integrator->setModels('taller', 'Maestros');
    }

    public function registrovehiculoAction() {
        $this->render('registrovehiculo');
    }

    public function getregistrovehiculoAction() {
        echo json_encode($this->registrovehiculo->getRegistrovehiculo($this->dataPost));
    }

    public function getregistrobajasAction() {
        echo json_encode($this->registrovehiculo->getRegistroBajas($this->dataPost));
    }

    public function getcolorAction() {
        $obj = new Color();
        echo json_encode($obj->getColorService());
    }

    public function gettipovehiculoAction() {
        $obj = new Tipovehiculo();
        echo json_encode($obj->getAllTipovehiculoService());
    }

    public function getmarcamodeloAction() {
        $obj = new Marcamodelo();
        echo json_encode($obj->getMarcamodeloService());
    }

    public function getestructuraAction() {
        $obj = new Nomestructura();
        echo json_encode($obj->getAllEstructuraService());
    }

    public function getgrupoexplotacionAction() {
        $obj = new Grupoexplotacion();
        echo json_encode($obj->getGrupoexplotacionService());
    }

    public function getorganoAction() {
        $obj = new Organo();
        echo json_encode($obj->getOrganoService());
    }

    public function addvehiculoAction() {
        echo json_encode($this->registrovehiculoModel->addVehiculo($this->dataPost));
    }

    public function modvehiculoAction() {
        echo json_encode($this->registrovehiculoModel->modVehiculo($this->dataPost));
    }

    public function delregistrovehiculoAction() {
        echo json_encode($this->registrovehiculoModel->delRegistrovehiculo($this->dataPost));
    }

    public function addbajavehiculoAction() {
        echo json_encode($this->registrovehiculoModel->addBajaVehiculo($this->dataPost));
    }

    public function setbajavehiculoAction() {
        echo json_encode($this->registrovehiculoModel->modBajaVehiculo($this->dataPost));
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->registrovehiculoModel->loadDataPreview($this->dataPost));
    }

}