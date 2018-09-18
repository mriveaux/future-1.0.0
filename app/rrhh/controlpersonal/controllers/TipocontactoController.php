<?php

class TipocontactoController extends ControllerSecure {

    private $tipocontacto;
    private $tipocontactoModel;

    public function __construct() {
        parent::__construct();
        $this->tipocontacto = new Tipocontacto();
        $this->tipocontactoModel = new TipocontactoModel();
    }

    public function gettipocontactoAction() {
        echo $this->dataResponse->toJson($this->tipocontacto->getTipocontacto($this->dataPost));
    }

    public function addtipocontactoAction() {
        echo $this->dataResponse->toJson($this->tipocontactoModel->addTipocontacto($this->dataRest));
    }

    public function modtipocontactoAction() {
        echo $this->dataResponse->toJson($this->tipocontactoModel->modTipocontacto($this->dataRest));
    }

    public function deltipocontactoAction() {
        echo $this->dataResponse->toJson($this->tipocontactoModel->delTipocontacto($this->dataRest));
    }

}
