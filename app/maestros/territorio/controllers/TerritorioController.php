<?php

class TerritorioController extends ControllerSecure {

    private $territorio;
    private $territorioModel;

    public function __construct() {
        parent::__construct();
        $this->territorio = new Territorio();
        $this->territorioModel = new TerritorioModel();
    }

    public function territorioAction() {
        $this->render('territorio');
    }

    public function getterritoriosAction() {
        echo $this->dataResponse->toJson($this->territorio->getTerritorios($this->dataPost));
    }

    public function addterritorioAction() {
        echo $this->dataResponse->toJson($this->territorioModel->addTerritorio($this->dataRest));
    }

    public function modterritorioAction() {
        echo $this->dataResponse->toJson($this->territorioModel->modTerritorio($this->dataRest));
    }

    public function delterritorioAction() {
        echo $this->dataResponse->toJson($this->territorioModel->delTerritorio($this->dataRest));
    }

}
