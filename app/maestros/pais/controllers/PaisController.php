<?php

class PaisController extends ControllerSecure {

    private $pais;
    private $paisModel;

    public function __construct() {
        parent::__construct();
        $this->pais = new Pais();
        $this->paisModel = new PaisModel();
    }

    public function paisAction() {
        $this->render('pais');
    }

    public function getpaisesAction() {
        echo $this->dataResponse->toJson($this->pais->getPaises($this->dataPost));
    }

    public function addpaisAction() {
        echo $this->dataResponse->toJson(json_decode($this->paisModel->addPais($this->dataPost->_dataPost)));
    }

    public function modpaisAction() {
        echo $this->dataResponse->toJson(json_decode($this->paisModel->modPais($this->dataPost->_dataPost)));
    }

    public function delpaisAction() {
        echo $this->dataResponse->toJson(json_decode($this->paisModel->delPais($this->dataPost->_dataPost)));
    }
    
    public function getdatarptAction() {
        echo $this->dataResponse->toJson($this->paisModel->getDataRpt($this->dataPost));
    }
    
    public function gettiposdpaAction() {
        echo $this->dataResponse->toJson($this->paisModel->getTiposDpa());
    }
    
    public function getpaisdpaAction() {
        echo $this->dataResponse->toJson($this->paisModel->getPaisDpa($this->dataRest));
    }
    
    public function addtipodpapaisAction() {
        echo $this->dataResponse->toJson($this->paisModel->addTipoDpaPais($this->dataPost));
    }
    
    public function deltipodpapaisAction() {
        echo $this->dataResponse->toJson($this->paisModel->delTipoDpaPais($this->dataPost));
    }

}
