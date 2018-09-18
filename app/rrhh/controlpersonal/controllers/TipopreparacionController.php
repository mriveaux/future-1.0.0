<?php

class TipopreparacionController extends ControllerSecure {

    private $tipopreparacion;
    private $tipopreparacionModel;

    public function __construct() {
        parent::__construct();
        $this->tipopreparacion = new Tipopreparacion();
        $this->tipopreparacionModel = new TipopreparacionModel();
    }

    public function gettipopreparacionAction() {
        echo $this->dataResponse->toJson($this->tipopreparacion->getTipopreparacion($this->dataPost));
    }

    public function addtipopreparacionAction() {
        echo $this->dataResponse->toJson($this->tipopreparacionModel->addTipopreparacion($this->dataRest));
    }

    public function modtipopreparacionAction() {
        echo $this->dataResponse->toJson($this->tipopreparacionModel->modTipopreparacion($this->dataRest));
    }

    public function deltipopreparacionAction() {
        echo $this->dataResponse->toJson($this->tipopreparacionModel->delTipopreparacion($this->dataRest));
    }

}
