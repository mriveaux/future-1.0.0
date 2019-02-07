<?php

class ChequeomedicoController extends ControllerSecure
{

    public function __construct() {
        parent::__construct();
        $this->chequeomedico = new Chequeomedico();
        $this->chequeomedicoModel = new ChequeomedicoModel();
    }

    public function getchequeomedicoAction() {
        echo $this->dataResponse->toJson($this->chequeomedico->getChequeomedico($this->dataPost));
    }

    public function addchequeomedicoAction() {
        echo $this->dataResponse->toJson($this->chequeomedicoModel->addChequeomedico($this->dataRest));
    }

    public function modchequeomedicoAction() {
        echo $this->dataResponse->toJson($this->chequeomedicoModel->modChequeomedico($this->dataRest->_dataRequest));
    }

    public function delchequeomedicoAction() {
        echo $this->dataResponse->toJson($this->chequeomedicoModel->delChequeomedico($this->dataRest->_dataRequest->id));
    }
}