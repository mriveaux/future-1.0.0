<?php

class RegistropersonaController extends ControllerSecure {

    private $registropersona;
    private $registropersonaModel;

    public function __construct() {
        parent::__construct();
        $this->registropersona = new Registropersona();
        $this->registropersonaModel = new RegistropersonaModel();
        $this->_integrator->setModels('maestros', 'NomPais');
    }

    public function registropersonaAction() {
        $this->render('registropersona');
    }

    public function getregistropersonasAction() {
        echo json_encode($this->registropersona->getRegistropersonas($this->dataPost, $this->dataSession->identidad));
    }

    public function getcategoriadocsAction() {
        echo json_encode($this->registropersona->getCategoriadocs());
    }

    public function getnacionalidadAction() {
        echo json_encode($this->registropersona->getNacionalidad());
    }

    public function getaditionaldataAction() {
        echo json_encode($this->registropersona->getAditionalData());
    }

    public function saveregistropersonaAction() {
        echo $this->dataResponse->toJson($this->registropersonaModel->saveRegistropersona($this->dataPost));
    }

    public function addregistropersonaAction() {
        echo $this->dataResponse->toJson($this->registropersonaModel->addRegistropersona(json_decode($this->dataRest)));
    }

    public function modregistropersonaAction() {
        echo json_encode($this->registropersonaModel->modRegistropersona($this->dataPost));
    }

    public function delregistropersonaAction() {
        echo json_encode($this->registropersonaModel->delRegistropersona($this->dataPost->idpersona));
    }

}