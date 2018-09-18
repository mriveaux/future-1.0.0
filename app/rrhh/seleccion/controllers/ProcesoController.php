<?php

class ProcesoController extends ControllerSecure {

    private $proceso;
    private $procesoModel;

    public function __construct() {
        parent::__construct();
        $this->proceso = new Proceso();
        $this->procesoModel = new ProcesoModel();
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('estructuraorg', 'Maestros');
        $this->_integrator->setModels('estructuraorg', 'Plantilla');
    }

    public function procesoAction() {
        $this->render('proceso');
    }

    public function getprocesosAction() {
        echo json_encode($this->proceso->getProcesos($this->dataPost));
    }

    public function getcargoplantillaAction() {
        echo json_encode($this->proceso->getCargoPlantilla());
    }

    public function saveprocesoAction() {
        echo $this->dataResponse->toJson($this->procesoModel->saveProceso($this->dataPost));
    }

    public function delprocesoAction() {
        echo json_encode($this->procesoModel->delProceso($this->dataPost->idprocesoseleccion));
    }

    public function changestatusprocesoAction() {
        echo $this->dataResponse->toJson($this->procesoModel->changeStatusProceso($this->dataPost));
    }

}