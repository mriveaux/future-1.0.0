<?php

class NiveleducacionController extends ControllerSecure {

    private $niveleducacion;
    private $niveleducacionModel;

    public function __construct() {
        parent::__construct();
        $this->niveleducacion = new Niveleducacion();
        $this->niveleducacionModel = new NiveleducacionModel();
    }

    public function getniveleducacionAction() {
        echo $this->dataResponse->toJson($this->niveleducacion->getNiveleducacion($this->dataPost));
    }

    public function addniveleducacionAction() {
        echo $this->dataResponse->toJson($this->niveleducacionModel->addNiveleducacion($this->dataRest));
    }

    public function modniveleducacionAction() {
        echo $this->dataResponse->toJson($this->niveleducacionModel->modNiveleducacion($this->dataRest));
    }

    public function delniveleducacionAction() {
        echo $this->dataResponse->toJson($this->niveleducacionModel->delNiveleducacion($this->dataRest));
    }

}
