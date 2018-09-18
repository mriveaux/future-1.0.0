<?php

class NoconformidadController extends ControllerSecure {

    private $noconformidad;
    private $noconformidadModel;

    public function __construct() {
        parent::__construct();
        $this->noconformidad = new Noconformidad();
        $this->noconformidadModel = new NoconformidadModel();
    }

    public function noconformidadAction() {
        $this->render('noconformidad');
    }

    public function getnoconformidadesAction() {
        echo json_encode($this->noconformidad->getNoconformidades($this->dataPost));
    }

    public function addnoconformidadAction() {
        echo json_encode($this->noconformidadModel->addNoconformidad($this->dataRest));
    }

    public function modnoconformidadAction() {
        echo json_encode($this->noconformidadModel->modNoconformidad($this->dataRest));
    }

    public function delnoconformidadAction() {
        echo json_encode($this->noconformidadModel->delNoconformidad($this->dataRest));
    }

}
