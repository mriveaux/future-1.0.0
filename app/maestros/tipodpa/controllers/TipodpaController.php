<?php

class TipodpaController extends ControllerSecure {

    private $tipodpa;
    private $tipodpaModel;

    public function __construct() {
        parent::__construct();
        $this->tipodpa = new Tipodpa();
        $this->tipodpaModel = new TipodpaModel();
    }

    public function tipodpaAction() {
        $this->render('tipodpa');
    }

    public function gettipodpasAction() {
        echo json_encode($this->tipodpa->getTipodpas($this->dataPost));
    }

    public function addtipodpaAction() {
        echo json_encode($this->tipodpaModel->addTipodpa($this->dataRest));
    }

    public function modtipodpaAction() {
        echo json_encode($this->tipodpaModel->modTipodpa($this->dataRest));
    }

    public function deltipodpaAction() {
        echo json_encode($this->tipodpaModel->delTipodpa($this->dataRest));
    }

}
