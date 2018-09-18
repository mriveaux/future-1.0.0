<?php

class FormacionController extends ControllerSecure {

    private $formacion;
    private $formacionModel;

    public function __construct() {
        parent::__construct();
        $this->formacion = new Formacion();
        $this->formacionModel = new FormacionModel();
    }

    public function getformacionAction() {
        echo $this->dataResponse->toJson($this->formacion->getFormacion($this->dataPost));
    }

    public function addformacionAction() {
        echo $this->dataResponse->toJson($this->formacionModel->addFormacion($this->dataRest));
    }

    public function modformacionAction() {
        echo $this->dataResponse->toJson($this->formacionModel->modFormacion($this->dataRest));
    }

    public function delformacionAction() {
        echo $this->dataResponse->toJson($this->formacionModel->delFormacion($this->dataRest));
    }

}
