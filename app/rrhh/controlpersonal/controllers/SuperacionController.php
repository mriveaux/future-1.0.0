<?php

class SuperacionController extends ControllerSecure {

    private $superacion;
    private $superacionModel;

    public function __construct() {
        parent::__construct();
        $this->superacion = new Superacion();
        $this->superacionModel = new SuperacionModel();
    }

    public function getsuperacionAction() {
        echo $this->dataResponse->toJson($this->superacion->getSuperacion($this->dataPost));
    }

    public function addsuperacionAction() {
        echo $this->dataResponse->toJson($this->superacionModel->addSuperacion($this->dataRest));
    }

    public function modsuperacionAction() {
        echo $this->dataResponse->toJson($this->superacionModel->modSuperacion($this->dataRest));
    }

    public function delsuperacionAction() {
        echo $this->dataResponse->toJson($this->superacionModel->delSuperacion($this->dataRest));
    }

}
