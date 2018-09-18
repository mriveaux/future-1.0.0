<?php

class CandidatoController extends ControllerSecure {

    private $candidato;
    private $candidatoModel;

    public function __construct() {
        parent::__construct();
        $this->candidato = new Candidato();
        $this->candidatoModel = new CandidatoModel();
        $this->_integrator->setModels('maestros', 'NomPais');
        $this->_integrator->setModels('capitalhumano', 'Controlpersonal');
    }

    public function getcandidatosAction() {
        echo json_encode($this->candidato->getCandidatos($this->dataPost));
    }

    public function getpersonasprocesoAction() {
        echo json_encode($this->candidatoModel->getPersonasProceso($this->dataPost));
    }

    public function addcandidatoAction() {
        echo $this->dataResponse->toJson($this->candidatoModel->saveCandidato($this->dataPost));
    }

    public function delcandidatoAction() {
        echo json_encode($this->candidatoModel->delCandidato($this->dataPost->idcandidatoseleccion));
    }

}