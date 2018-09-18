<?php

class DocidentidadController extends ControllerSecure {

    private $docidentidad;
    private $docidentidadModel;

    public function __construct() {
        parent::__construct();
        $this->docidentidad = new Docidentidad();
        $this->docidentidadModel = new DocidentidadModel();
    }

    public function getdocidentidadesAction() {
        echo $this->dataResponse->toJson($this->docidentidad->getDocidentidad($this->dataPost));
    }

    public function adddocidentidadAction() {
        echo $this->dataResponse->toJson($this->docidentidadModel->addDocidentidad($this->dataRest));
    }

    public function moddocidentidadAction() {
        echo $this->dataResponse->toJson($this->docidentidadModel->modDocidentidad($this->dataRest));
    }

    public function deldocidentidadAction() {
        echo $this->dataResponse->toJson($this->docidentidadModel->delDocidentidad($this->dataRest));
    }

}
