<?php

class MediocontactoController extends ControllerSecure {

    private $mediocontacto;
    private $mediocontactoModel;

    public function __construct() {
        parent::__construct();
        $this->mediocontacto = new Mediocontacto();
        $this->mediocontactoModel = new MediocontactoModel();
    }

    public function getmediocontactoAction() {
        echo $this->dataResponse->toJson($this->mediocontacto->getMediocontacto($this->dataPost));
    }

    public function addmediocontactoAction() {
        echo $this->dataResponse->toJson($this->mediocontactoModel->addMediocontacto($this->dataRest));
    }

    public function modmediocontactoAction() {
        echo $this->dataResponse->toJson($this->mediocontactoModel->modMediocontacto($this->dataRest));
    }

    public function delmediocontactoAction() {
        echo $this->dataResponse->toJson($this->mediocontactoModel->delMediocontacto($this->dataRest));
    }

}
