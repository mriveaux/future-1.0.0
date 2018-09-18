<?php

class ProcedenciaController extends ControllerSecure {

    private $procedencia;
    private $procedenciaModel;

    public function __construct() {
        parent::__construct();
        $this->procedencia = new Procedencia();
        $this->procedenciaModel = new ProcedenciaModel();
    }

    public function getprocedenciaAction() {
        echo $this->dataResponse->toJson($this->procedencia->getProcedencia($this->dataPost));
    }

    public function addprocedenciaAction() {
        echo $this->dataResponse->toJson($this->procedenciaModel->addProcedencia($this->dataRest));
    }

    public function modprocedenciaAction() {
        echo $this->dataResponse->toJson($this->procedenciaModel->modProcedencia($this->dataRest));
    }

    public function delprocedenciaAction() {
        echo $this->dataResponse->toJson($this->procedenciaModel->delProcedencia($this->dataRest));
    }

}
