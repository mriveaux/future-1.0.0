<?php

class DireccionController extends ControllerSecure {

    private $direccion;
    private $direccionModel;

    public function __construct() {
        parent::__construct();
        $this->direccion = new Direccion();
        $this->direccionModel = new DireccionModel();
//        $this->_integrator->setModels('maestros', 'NomPais');
    }

    public function getdireccionAction() {
        echo $this->dataResponse->toJson($this->direccion->getDireccion($this->dataPost));
    }

    public function adddireccionAction() {
        echo $this->dataResponse->toJson($this->direccionModel->addDireccion($this->dataRest));
    }

    public function moddireccionAction() {
        echo $this->dataResponse->toJson($this->direccionModel->modDireccion($this->dataRest));
    }

    public function deldireccionAction() {
        echo $this->dataResponse->toJson($this->direccionModel->delDireccion($this->dataRest));
    }

}
