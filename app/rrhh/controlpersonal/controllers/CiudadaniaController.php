<?php

class CiudadaniaController extends ControllerSecure {

    private $ciudadania;
    private $ciudadaniaModel;

    public function __construct() {
        parent::__construct();
        $this->ciudadania = new Ciudadania();
        $this->ciudadaniaModel = new CiudadaniaModel();
        $this->_integrator->setModels('maestros', 'NomPais');
    }

    public function getciudadaniaAction() {
        echo $this->dataResponse->toJson($this->ciudadania->getCiudadania($this->dataPost));
    }

    public function addciudadaniaAction() {
        echo $this->dataResponse->toJson($this->ciudadaniaModel->addCiudadania($this->dataRest));
    }

    public function modciudadaniaAction() {
        echo $this->dataResponse->toJson($this->ciudadaniaModel->modCiudadania($this->dataRest));
    }

    public function delciudadaniaAction() {
        echo $this->dataResponse->toJson($this->ciudadaniaModel->delCiudadania($this->dataRest));
    }

}
