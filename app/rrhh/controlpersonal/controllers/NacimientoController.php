<?php

class NacimientoController extends ControllerSecure {

    private $nacimiento;
    private $nacimientoModel;

    public function __construct() {
        parent::__construct();
        $this->nacimiento = new Nacimiento();
        $this->nacimientoModel = new NacimientoModel();
    }

    public function getnacimientoAction() {
        echo $this->dataResponse->toJson($this->nacimiento->getNacimiento($this->dataPost));
    }

    public function savenacimientoAction() {
        echo $this->dataResponse->toJson($this->nacimientoModel->saveNacimiento($this->dataRest));
    }
    
    public function addnacimientoAction() {
        echo $this->dataResponse->toJson($this->nacimientoModel->addNacimiento($this->dataRest));
    }

    public function modnacimientoAction() {
        echo $this->dataResponse->toJson($this->nacimientoModel->modNacimiento($this->dataRest));
    }

    public function delnacimientoAction() {
        echo $this->dataResponse->toJson($this->nacimientoModel->delNacimiento($this->dataRest));
    }

}
