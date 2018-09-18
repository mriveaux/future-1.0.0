<?php

class GruposanguineoController extends ControllerSecure {

    private $gruposanguineo;
    private $gruposanguineoModel;

    public function __construct() {
        parent::__construct();
        $this->gruposanguineo = new Gruposanguineo();
        $this->gruposanguineoModel = new GruposanguineoModel();
    }

    public function getgruposanguineoAction() {
        echo $this->dataResponse->toJson($this->gruposanguineo->getGruposanguineo($this->dataPost));
    }

    public function addgruposanguineoAction() {
        echo $this->dataResponse->toJson($this->gruposanguineoModel->addGruposanguineo($this->dataRest));
    }

    public function modgruposanguineoAction() {
        echo $this->dataResponse->toJson($this->gruposanguineoModel->modGruposanguineo($this->dataRest));
    }

    public function delgruposanguineoAction() {
        echo $this->dataResponse->toJson($this->gruposanguineoModel->delGruposanguineo($this->dataRest));
    }

}
