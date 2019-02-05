<?php

class VehiculoController extends ControllerSecure
{

    public function __construct() {
        parent::__construct();
        $this->vehiculo = new Vehiculo();
        $this->vehiculoModel = new VehiculoModel();

        $this->_integrator->setModels('taller', 'Explotacion');
        $this->_integrator->setModels('taller', 'Maestros');
        $this->regvehiculo = new Registrovehiculo();
    }

    public function getvehiculosAction() {
        echo $this->dataResponse->toJson($this->vehiculo->getVehiculos($this->dataPost));
    }

    public function addvehiculoAction() {
        echo $this->dataResponse->toJson($this->vehiculoModel->addVehiculo($this->dataRest));
    }

    public function modvehiculoAction() {
        echo $this->dataResponse->toJson($this->vehiculoModel->modVehiculo($this->dataRest->_dataRequest));
    }

    public function delvehiculoAction() {
        echo $this->dataResponse->toJson($this->vehiculoModel->delVehiculo($this->dataRest->_dataRequest->id));
    }

    public function getregistrovehiculosAction() {
        echo $this->dataResponse->toJson($this->regvehiculo->getRegistrovehiculoService($this->dataPost));
    }

}