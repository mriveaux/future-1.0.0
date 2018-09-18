<?php

class TallajeController extends ControllerSecure {

    private $tallaje;
    private $tallajeModel;

    public function __construct() {
        parent::__construct();
        $this->tallaje = new Tallaje();
        $this->tallajeModel = new TallajeModel();
    }

    public function gettallajeAction() {
        echo $this->dataResponse->toJson($this->tallaje->getTallaje($this->dataPost));
    }

    public function addtallajeAction() {
        echo $this->dataResponse->toJson($this->tallajeModel->addTallaje($this->dataRest));
    }

    public function modtallajeAction() {
        echo $this->dataResponse->toJson($this->tallajeModel->modTallaje($this->dataRest));
    }

    public function deltallajeAction() {
        echo $this->dataResponse->toJson($this->tallajeModel->delTallaje($this->dataRest));
    }

}
