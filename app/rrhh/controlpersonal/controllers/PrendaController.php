<?php

class PrendaController extends ControllerSecure {

    private $prenda;
    private $prendaModel;

    public function __construct() {
        parent::__construct();
        $this->prenda = new Prenda();
        $this->prendaModel = new PrendaModel();
    }

    public function getprendaAction() {
        echo $this->dataResponse->toJson($this->prenda->getPrenda($this->dataPost));
    }

    public function addprendaAction() {
        echo $this->dataResponse->toJson($this->prendaModel->addPrenda($this->dataRest));
    }

    public function modprendaAction() {
        echo $this->dataResponse->toJson($this->prendaModel->modPrenda($this->dataRest));
    }

    public function delprendaAction() {
        echo $this->dataResponse->toJson($this->prendaModel->delPrenda($this->dataRest));
    }

}
