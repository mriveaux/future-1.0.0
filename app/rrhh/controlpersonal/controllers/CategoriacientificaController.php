<?php

class CategoriacientificaController extends ControllerSecure {

    private $categoriacientifica;
    private $categoriacientificaModel;

    public function __construct() {
        parent::__construct();
        $this->categoriacientifica = new Categoriacientifica();
        $this->categoriacientificaModel = new CategoriacientificaModel();
    }

    public function getcategoriacientificaAction() {
        echo $this->dataResponse->toJson($this->categoriacientifica->getCategoriacientifica($this->dataPost));
    }

    public function addcategoriacientificaAction() {
        echo $this->dataResponse->toJson($this->categoriacientificaModel->addCategoriacientifica($this->dataRest));
    }

    public function modcategoriacientificaAction() {
        echo $this->dataResponse->toJson($this->categoriacientificaModel->modCategoriacientifica($this->dataRest));
    }

    public function delcategoriacientificaAction() {
        echo $this->dataResponse->toJson($this->categoriacientificaModel->delCategoriacientifica($this->dataRest));
    }

}
