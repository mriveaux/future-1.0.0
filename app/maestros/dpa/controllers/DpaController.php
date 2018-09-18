<?php

class DpaController extends ControllerSecure {

    private $dpa;
    private $dpaModel;

    public function __construct() {
        parent::__construct();
        $this->dpa = new Dpa();
        $this->dpaModel = new DpaModel();
        $this->_integrator->setModels('maestros', 'NomPais');
        $this->_integrator->setModels('maestros', 'NomTipodpa');
    }

    public function dpaAction() {
        $this->render('dpa');
    }

    public function adddpaAction() {
        echo json_encode($this->dpaModel->addDpa($this->dataPost));
    }

    public function moddpaAction() {
        echo json_encode($this->dpaModel->modDpa($this->dataPost));
    }

    public function deldpaAction() {
        echo json_encode($this->dpaModel->delDpa($this->dataPost->id));
    }
    
    public function getpaisesAction() {
        $objPais = new Pais();
        $result = $objPais->getListPaisesService($this->dataPost);
        echo json_encode(['data' => $result]);
    }
    
    public function gettipodpaAction() {
        $objTipodpa = new Tipodpa();
        echo json_encode($objTipodpa->getTipodpasService($this->dataRest));
    }
    
    public function getdpapaisAction() {
        echo json_encode($this->dpaModel->getDpaPais($this->dataRest));
    }

}
