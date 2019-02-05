<?php

class CompetenciasController extends ControllerSecure
{

    public function __construct() {
        parent::__construct();
        $this->competencia = new Competencia();
        $this->competenciaModel = new CompetenciaModel();
    }

    public function getcompetenciasAction() {
        echo $this->dataResponse->toJson($this->competencia->getCompetencias($this->dataPost));
    }

    public function addcompetenciaAction() {
        echo $this->dataResponse->toJson($this->competenciaModel->addCompetencia($this->dataRest));
    }

    public function modcompetenciaAction() {
        echo $this->dataResponse->toJson($this->competenciaModel->modCompetencia($this->dataRest->_dataRequest));
    }

    public function delcompetenciaAction() {
        echo $this->dataResponse->toJson($this->competenciaModel->delCompetencia($this->dataRest->_dataRequest->id));
    }
}